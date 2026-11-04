import React, { useEffect, useRef } from 'react';
import { companyInfo } from '../data/seadunesData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Statistics() {
  const statsSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stat values when scrolled into view
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
  }, []);

  return (
    <section ref={statsSectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Section Head - No tags */}
        <div className="animate-head" style={{ marginBottom: '2.5rem', maxWidth: '880px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0 }}>
            We've guided adventures across Oman's desert, sea, and canyons for over 20 years.
          </h2>
        </div>

        {/* Statistic Cards Grid: 4 columns on Desktop, Clean 2x2 on Mobile */}
        <div className="stats-grid animate-cards-grid">
          {companyInfo.stats.map((stat, idx) => {
            const num = parseInt(stat.value, 10);
            const suffix = stat.value.replace(/^[0-9]+/, '');

            return (
              <div key={idx} className="statistic-card reveal-card" style={{ margin: 0 }}>
                <div style={{ 
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', 
                  fontWeight: 800, 
                  color: 'var(--text-primary)', 
                  letterSpacing: '-2px', 
                  marginBottom: '0.5rem', 
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'baseline'
                }}>
                  <span className="stat-count-target" data-target={num}>{num}</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{suffix}</span>
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
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
