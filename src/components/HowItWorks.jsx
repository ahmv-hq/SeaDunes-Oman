import React, { useState, useRef } from 'react';
import { Compass, Sliders, Truck, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const stepIcons = [Compass, Sliders, Truck, Award];

export default function HowItWorks() {
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { isArabic, t } = useLanguage();

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const itemWidth = clientWidth * 0.82;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveIdx(Math.min(Math.max(idx, 0), t.howItWorks.steps.length - 1));
  };

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const itemWidth = clientWidth * 0.82 + 18;
    sliderRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIdx(index);
  };

  return (
    <section id="how-it-works" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head */}
        <div className="animate-head" style={{ marginBottom: '2.5rem', maxWidth: '820px' }}>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3rem)', fontWeight: 700, letterSpacing: isArabic ? '0' : '-1.5px', color: 'var(--text-primary)', margin: '0 0 0.85rem' }}>
            {t.howItWorks.heading}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.65, margin: 0 }}>
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4-Step Cards: 4 Columns on Desktop, Touch Snap Slider on Mobile */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="how-it-works-grid mobile-slider-track animate-cards-grid"
        >
          {t.howItWorks.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;
            return (
              <div 
                key={idx} 
                className="step-card reveal-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                {/* Step Number & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 900, 
                    color: 'var(--accent-cyan)', 
                    opacity: 0.9,
                    letterSpacing: '-1px'
                  }}>
                    {step.num}
                  </span>
                  
                  <div style={{ 
                    width: '2.75rem', 
                    height: '2.75rem', 
                    borderRadius: '50%', 
                    background: 'var(--surface-pill)', 
                    border: '1px solid var(--border-glass)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--accent-cyan)' 
                  }}>
                    <Icon size={19} />
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Indicators & Numbers */}
        <div className="mobile-slider-controls mobile-only">
          <div className="mobile-slider-dots">
            {t.howItWorks.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`mobile-slider-dot ${activeIdx === i ? 'active' : ''}`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>

          <div className="mobile-swipe-hint">
            <span>{isArabic ? `خطوة ${activeIdx + 1} من ${t.howItWorks.steps.length}` : `Step ${activeIdx + 1} of ${t.howItWorks.steps.length}`}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
