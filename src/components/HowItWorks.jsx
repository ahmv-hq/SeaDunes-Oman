import React, { useState, useRef } from 'react';
import { Compass, Sliders, Truck, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Choose Your Adventure",
    desc: "Browse our 9 signature packages across sea, dunes, and canyons, or pick your dream machine from our Polaris and ATV fleet.",
    icon: Compass
  },
  {
    num: "02",
    title: "Customize & Reserve",
    desc: "Pick your private charter or sharing group, select preferred departure hours, and add optional water games or sandboarding gear.",
    icon: Sliders
  },
  {
    num: "03",
    title: "Door-to-Door Transfer",
    desc: "Relax as our comfortable air-conditioned 4WD vehicles pick you up directly from your Muscat hotel, residence, or airport.",
    icon: Truck
  },
  {
    num: "04",
    title: "Experience Pure Oman",
    desc: "Explore with certified local Omani guides who know every secret cave, coral reef, and dune ridge with 20+ years of pedigree.",
    icon: Award
  }
];

export default function HowItWorks() {
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const itemWidth = clientWidth * 0.82;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveIdx(Math.min(Math.max(idx, 0), steps.length - 1));
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

  const handlePrev = () => {
    const nextIdx = Math.max(activeIdx - 1, 0);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeIdx + 1, steps.length - 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section id="how-it-works" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head - Clean without tags */}
        <div className="animate-head" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2.25rem' }}>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3rem)', fontWeight: 700, letterSpacing: '-1.5px', color: 'var(--text-primary)', margin: '0 0 0.75rem' }}>
            How It <span style={{ color: 'var(--accent-cyan)' }}>Works</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            From your initial online or WhatsApp inquiry to VIP hotel return, we take care of all logistics so you can enjoy the thrill.
          </p>
        </div>

        {/* 4 Steps: Grid on Desktop, Touch Snap Slider on Mobile */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="steps-grid mobile-slider-track steps-slider-track animate-cards-grid"
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx} 
                className="statistic-card reveal-card"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 0 }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-1px' }}>
                      {s.num}
                    </span>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'var(--surface-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glass)' }}>
                      <Icon size={18} color="var(--accent-cyan)" />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.65rem', letterSpacing: '-0.3px' }}>
                    {s.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--divider)', fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="var(--accent-cyan)" />
                  <span>Verified Seamless Logistics</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Slider Controls (Hidden on Desktop) */}
        <div className="mobile-only mobile-slider-controls">
          <div className="mobile-swipe-hint">
            <span>Swipe steps 01-04</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="mobile-slider-dots">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`mobile-slider-dot ${activeIdx === i ? 'active' : ''}`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button 
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="mobile-slider-arrow"
                aria-label="Previous Step"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext}
                disabled={activeIdx === steps.length - 1}
                className="mobile-slider-arrow"
                aria-label="Next Step"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
