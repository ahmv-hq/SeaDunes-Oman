import React, { useState, useRef, useEffect } from 'react';
import { fleetVehicles } from '../data/seadunesData';
import { Gauge, Users, ArrowUpRight, Check, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FleetSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('buggy');
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = fleetVehicles.filter(v => {
    if (activeCategory === 'all') return true;
    return v.category === activeCategory;
  });

  useEffect(() => {
    setActiveIdx(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

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

  const handlePrev = () => {
    const nextIdx = Math.max(activeIdx - 1, 0);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeIdx + 1, filtered.length - 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section id="fleet" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head - Clean without tags */}
        <div className="animate-head" style={{ marginBottom: '2.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3rem)', fontWeight: 700, letterSpacing: '-1.5px', color: 'var(--text-primary)', margin: 0 }}>
                The Adventure <span style={{ color: 'var(--accent-cyan)' }}>Fleet</span>
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                From 168HP turbocharged Polaris dune buggies to supercharged Yamaha jet skis and eco electric scooters.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveCategory('buggy')}
              className={`pill-tag ${activeCategory === 'buggy' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Polaris Buggies (5 Models)
            </button>
            <button
              onClick={() => setActiveCategory('quad')}
              className={`pill-tag ${activeCategory === 'quad' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Quad ATVs (Yamaha Raptors)
            </button>
            <button
              onClick={() => setActiveCategory('water')}
              className={`pill-tag ${activeCategory === 'water' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Water Sports & Jet Car
            </button>
            <button
              onClick={() => setActiveCategory('all')}
              className={`pill-tag ${activeCategory === 'all' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Show All Fleet
            </button>
          </div>
        </div>

        {/* Fleet Grid on Desktop, Touch Snap Slider on Mobile */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="fleet-grid mobile-slider-track animate-cards-grid"
        >
          {filtered.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="glass-card reveal-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                margin: 0
              }}
            >
              <div>
                {/* Visual Image container */}
                <div style={{ 
                  height: '190px', 
                  borderRadius: '1.25rem', 
                  overflow: 'hidden', 
                  background: 'var(--surface-glass)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '1rem', 
                  marginBottom: '1.25rem', 
                  position: 'relative',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/Quad-Bike-Safari-activity.png';
                    }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="pill-tag" style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--surface-glass-modal)' }}>
                      <Zap size={10} color="var(--accent-cyan)" />
                      {vehicle.badge}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem', letterSpacing: '-0.3px' }}>
                  {vehicle.name}
                </h3>

                {/* Specs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', paddingBottom: '0.65rem', borderBottom: '1px solid var(--divider)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} color="var(--accent-cyan)" />
                    <span>{vehicle.capacity}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Gauge size={14} color="var(--accent-cyan)" />
                    <span>{vehicle.power}</span>
                  </span>
                </div>

                {/* Specs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {vehicle.specs.slice(0, 3).map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Check size={12} color="var(--accent-cyan)" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--divider)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Rate</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {vehicle.discountRate || vehicle.rateHourly}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking({ packageTitle: vehicle.name, price: vehicle.discountRate || vehicle.rateHourly })}
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}
                >
                  <span>Reserve</span>
                  <ArrowUpRight size={13} color="#ffffff" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Slider Controls (Hidden on Desktop) */}
        {filtered.length > 1 && (
          <div className="mobile-only mobile-slider-controls">
            <div className="mobile-swipe-hint">
              <span>Swipe machines to view</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="mobile-slider-dots">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    className={`mobile-slider-dot ${activeIdx === i ? 'active' : ''}`}
                    aria-label={`Go to vehicle ${i + 1}`}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <button 
                  onClick={handlePrev}
                  disabled={activeIdx === 0}
                  className="mobile-slider-arrow"
                  aria-label="Previous Vehicle"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={activeIdx === filtered.length - 1}
                  className="mobile-slider-arrow"
                  aria-label="Next Vehicle"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
