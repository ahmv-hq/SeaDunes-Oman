import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';

export default function Statistics() {
  const statsSectionRef = useRef(null);
  const { isArabic, t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statElements = document.querySelectorAll('.stat-count-target');
      statElements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(targetValue)) {
          const counter = { val: 0 };
          gsap.to(counter, {
            val: targetValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              el.innerText = Math.floor(counter.val);
            },
          });
        }
      });
    }, statsSectionRef);

    return () => ctx.revert();
  }, [isArabic]);

  return (
    <section ref={statsSectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Head */}
        <div className="animate-head" style={{ marginBottom: '2.5rem', maxWidth: '880px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 700, lineHeight: 1.3, letterSpacing: isArabic ? '0' : '-1px', color: 'var(--text-primary)', margin: 0 }}>
            {t.stats.heading}
          </h2>
        </div>

        {/* Statistic Cards Grid: 4 columns on Desktop, Clean 2x2 on Mobile */}
        <div className="stats-grid animate-cards-grid">
          {t.stats.items.map((stat, idx) => {
            const num = parseInt(stat.value, 10);
            const suffix = stat.value.replace(/^[0-9]+/, '');

            return (
              <div key={idx} className="statistic-card reveal-card" style={{ margin: 0 }}>
                <div style={{ 
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', 
                  fontWeight: 800, 
                  color: 'var(--text-primary)', 
                  letterSpacing: '-2px', 
                  lineHeight: 1, 
                  marginBottom: '0.65rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  direction: 'ltr'
                }}>
                  <span className="stat-count-target" data-target={num}>
                    {num}
                  </span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{suffix}</span>
                </div>
                
                <div style={{ 
                  fontSize: '1.05rem', 
                  fontWeight: 700, 
                  color: 'var(--text-primary)', 
                  marginBottom: '0.4rem',
                  lineHeight: 1.3
                }}>
                  {stat.label}
                </div>
                
                <div style={{ 
                  fontSize: '0.84rem', 
                  color: 'var(--text-muted)', 
                  lineHeight: 1.5 
                }}>
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
