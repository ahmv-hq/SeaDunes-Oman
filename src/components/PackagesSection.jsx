import React, { useState, useRef } from 'react';
import { tourPackages } from '../data/seadunesData';
import { MapPin, Calendar, Users, Star, ArrowUpRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PackagesSection({ onOpenBooking, onSelectPackageDetails }) {
  const [filter, setFilter] = useState('all');
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = tourPackages.filter((p) => {
    if (filter === 'marine') return p.title.toLowerCase().includes('cruise') || p.title.toLowerCase().includes('snorkel') || p.title.toLowerCase().includes('sunset');
    if (filter === 'desert') return p.title.toLowerCase().includes('desert') || p.title.toLowerCase().includes('wahiba');
    if (filter === 'mountain') return p.title.toLowerCase().includes('wadi') || p.title.toLowerCase().includes('jabal') || p.title.toLowerCase().includes('jebel');
    if (filter === 'heritage') return p.title.toLowerCase().includes('nizwa') || p.title.toLowerCase().includes('muscat') || p.title.toLowerCase().includes('historical');
    return true;
  });

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
    <section id="packages" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head - Clean without tags */}
        <div className="animate-head" style={{ marginBottom: '2.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3rem)', fontWeight: 700, letterSpacing: '-1.5px', color: 'var(--text-primary)', margin: 0 }}>
                Featured <span style={{ color: 'var(--accent-cyan)' }}>3x3 Packages</span>
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Discover protected marine reserves, towering sand waves, and UNESCO heritage forts with all-inclusive door-to-door transport and private local guides.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter('all')}
              className={`pill-tag ${filter === 'all' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              All 9 Packages
            </button>
            <button
              onClick={() => setFilter('marine')}
              className={`pill-tag ${filter === 'marine' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Marine & Yacht Cruises
            </button>
            <button
              onClick={() => setFilter('desert')}
              className={`pill-tag ${filter === 'desert' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Wahiba Sands Safaris
            </button>
            <button
              onClick={() => setFilter('mountain')}
              className={`pill-tag ${filter === 'mountain' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              Wadis & Jebel Shams
            </button>
            <button
              onClick={() => setFilter('heritage')}
              className={`pill-tag ${filter === 'heritage' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              UNESCO Heritage Forts
            </button>
          </div>
        </div>

        {/* 3x3 Grid on Desktop, Touch Snap Slider on Mobile */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="packages-3x3-grid mobile-slider-track animate-cards-grid"
        >
          {filtered.map((pkg) => (
            <div 
              key={pkg.id} 
              className="package-card-3x3 reveal-card"
            >
              {/* Top Visual */}
              <div className="package-card-3x3__visual">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/Untitled-design-55.png';
                  }}
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(6, 21, 45, 0.55) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />
                
                {/* Floating Badges */}
                <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', right: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                  <span className="pill-tag" style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'var(--surface-glass-modal)', borderColor: 'var(--border-accent)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    Package {pkg.num}
                  </span>
                  <span className="pill-tag" style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'var(--surface-glass-modal)', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    {pkg.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="package-card-3x3__body">
                
                {/* Title & Price */}
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: '0 0 0.65rem', lineHeight: 1.35, minHeight: '3.1rem' }}>
                    {pkg.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--divider)' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>from</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-0.5px' }}>{pkg.price}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{pkg.pricePeriod}</span>
                  </div>
                </div>

                {/* Property Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pkg.location}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{pkg.duration}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={14} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{pkg.groupSize}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={13} color="#f59e0b" fill="#f59e0b" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      5.0 (350+ Reviews)
                    </span>
                  </div>

                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingTop: '0.25rem' }}>
                  <button
                    onClick={() => onSelectPackageDetails(pkg)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '0.6rem 0.75rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    <Eye size={13} color="var(--accent-cyan)" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => onOpenBooking({ packageTitle: pkg.title, price: pkg.price })}
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.6rem 0.75rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    <span>Book</span>
                    <ArrowUpRight size={13} color="#ffffff" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Mobile Slider Controls (Hidden on Desktop) */}
        <div className="mobile-only mobile-slider-controls">
          <div className="mobile-swipe-hint">
            <span>Swipe cards to explore</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="mobile-slider-dots">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`mobile-slider-dot ${activeIdx === i ? 'active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button 
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="mobile-slider-arrow"
                aria-label="Previous Package"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext}
                disabled={activeIdx === filtered.length - 1}
                className="mobile-slider-arrow"
                aria-label="Next Package"
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
