import React, { useState, useRef } from 'react';
import { fleetVehicles } from '../data/seadunesData';
import { Gauge, Users, ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FleetSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('buggy');
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { isArabic, t } = useLanguage();

  const filtered = fleetVehicles.filter(v => {
    if (activeCategory === 'all') return true;
    return v.category === activeCategory;
  });

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveIdx(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const itemWidth = clientWidth * 0.84;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveIdx(Math.min(Math.max(idx, 0), filtered.length - 1));
  };

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const itemWidth = clientWidth * 0.84 + 18;
    sliderRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIdx(index);
  };

  return (
    <section id="fleet" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head */}
        <div className="animate-head" style={{ marginBottom: '2.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3rem)', fontWeight: 700, letterSpacing: isArabic ? '0' : '-1.5px', color: 'var(--text-primary)', margin: 0 }}>
                {t.fleetSection.headingPart1} <span style={{ color: 'var(--accent-cyan)' }}>{t.fleetSection.headingAccent}</span>
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                {t.fleetSection.subtitle}
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleCategoryChange('buggy')}
              className={`pill-tag ${activeCategory === 'buggy' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.fleetSection.filterBuggy}
            </button>
            <button
              onClick={() => handleCategoryChange('quad')}
              className={`pill-tag ${activeCategory === 'quad' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.fleetSection.filterQuad}
            </button>
            <button
              onClick={() => handleCategoryChange('water')}
              className={`pill-tag ${activeCategory === 'water' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.fleetSection.filterWater}
            </button>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`pill-tag ${activeCategory === 'all' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.fleetSection.filterAll}
            </button>
          </div>
        </div>

        {/* 3-Column Grid on Desktop, Touch Snap Slider on Mobile */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="fleet-grid mobile-slider-track animate-cards-grid"
        >
          {filtered.map((v) => {
            const name = isArabic && v.nameAr ? v.nameAr : v.name;
            const badge = isArabic && v.badgeAr ? v.badgeAr : v.badge;
            const capacity = isArabic && v.capacityAr ? v.capacityAr : v.capacity;
            const power = isArabic && v.powerAr ? v.powerAr : v.power;
            const rate = isArabic && v.rateHourlyAr ? v.rateHourlyAr : v.rateHourly;
            const discountRate = isArabic && v.discountRateAr ? v.discountRateAr : v.discountRate;
            const specs = isArabic && v.specsAr ? v.specsAr : v.specs;

            return (
              <div 
                key={v.id} 
                className="fleet-card reveal-card"
              >
                {/* Header Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="pill-tag" style={{ fontSize: '0.72rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.06em', background: 'var(--surface-pill)', borderColor: 'var(--border-accent)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    {badge}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Users size={13} color="var(--accent-cyan)" />
                    <span>{capacity}</span>
                  </div>
                </div>

                {/* Title & Engine Specs */}
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem', lineHeight: 1.3 }}>
                    {name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    <Gauge size={14} />
                    <span>{power}</span>
                  </div>
                </div>

                {/* Machine Isolated Preview with Smooth Shadow */}
                <div style={{
                  position: 'relative',
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '1.25rem 0',
                  padding: '0.5rem',
                  borderRadius: '1.25rem',
                  background: 'radial-gradient(circle at center, var(--surface-pill) 0%, transparent 70%)'
                }}>
                  <img
                    src={v.image}
                    alt={name}
                    style={{
                      maxHeight: '160px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: 'drop-shadow(0 12px 18px rgba(0, 0, 0, 0.25))'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = v.fallbackImages?.[0] || '/images/Polaris-1000-P.C.-turbo-Buggy.png';
                    }}
                  />
                </div>

                {/* Specifications Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
                  {specs.slice(0, 4).map((spec, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Check size={13} color="var(--accent-cyan)" flexShrink={0} />
                      <span style={{ lineHeight: 1.4 }}>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer: Rates & CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.15rem', borderTop: '1px solid var(--divider)', marginTop: 'auto' }}>
                  <div>
                    {discountRate ? (
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          {rate}
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                          {discountRate}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.04em' }}>
                          {t.fleetSection.startingFrom}
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                          {rate}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenBooking({ packageTitle: name, price: discountRate || rate })}
                    className="btn-primary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.82rem' }}
                  >
                    <span>{t.fleetSection.bookRide}</span>
                    <ArrowUpRight size={13} color="#ffffff" className="rtl-mirror" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Indicators & Arrows */}
        <div className="mobile-slider-controls mobile-only">
          <div className="mobile-slider-dots">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`mobile-slider-dot ${activeIdx === i ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="mobile-swipe-hint">
            <span>{isArabic ? `مركبة ${activeIdx + 1} من ${filtered.length}` : `Machine ${activeIdx + 1} of ${filtered.length}`}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
