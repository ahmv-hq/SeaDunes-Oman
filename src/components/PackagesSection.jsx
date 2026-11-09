import React, { useState, useRef } from 'react';
import { tourPackages } from '../data/seadunesData';
import { MapPin, Calendar, Users, ArrowUpRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PackagesSection({ onOpenBooking, onSelectPackageDetails }) {
  const [filter, setFilter] = useState('all');
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { isArabic, t } = useLanguage();

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

  return (
    <section id="packages" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head */}
        <div className="animate-head" style={{ marginBottom: '2.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3rem)', fontWeight: 700, letterSpacing: isArabic ? '0' : '-1.5px', color: 'var(--text-primary)', margin: 0 }}>
                {t.packagesSection.headingPart1} <span style={{ color: 'var(--accent-cyan)' }}>{t.packagesSection.headingAccent}</span>
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                {t.packagesSection.subtitle}
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
              {t.packagesSection.filterAll}
            </button>
            <button
              onClick={() => setFilter('marine')}
              className={`pill-tag ${filter === 'marine' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.packagesSection.filterMarine}
            </button>
            <button
              onClick={() => setFilter('desert')}
              className={`pill-tag ${filter === 'desert' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.packagesSection.filterDesert}
            </button>
            <button
              onClick={() => setFilter('mountain')}
              className={`pill-tag ${filter === 'mountain' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.packagesSection.filterMountain}
            </button>
            <button
              onClick={() => setFilter('heritage')}
              className={`pill-tag ${filter === 'heritage' ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {t.packagesSection.filterHeritage}
            </button>
          </div>
        </div>

        {/* 3x3 Grid on Desktop, Touch Snap Slider on Mobile */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="packages-3x3-grid mobile-slider-track animate-cards-grid"
        >
          {filtered.map((pkg) => {
            const title = isArabic && pkg.titleAr ? pkg.titleAr : pkg.title;
            const badge = isArabic && pkg.badgeAr ? pkg.badgeAr : pkg.badge;
            const location = isArabic && pkg.locationAr ? pkg.locationAr : pkg.location;
            const duration = isArabic && pkg.durationAr ? pkg.durationAr : pkg.duration;
            const groupSize = isArabic && pkg.groupSizeAr ? pkg.groupSizeAr : pkg.groupSize;
            const price = isArabic && pkg.priceAr ? pkg.priceAr : pkg.price;
            const pricePeriod = isArabic && pkg.pricePeriodAr ? pkg.pricePeriodAr : pkg.pricePeriod;
            const overview = isArabic && pkg.overviewAr ? pkg.overviewAr : pkg.overview;

            return (
              <div 
                key={pkg.id} 
                className="package-card-3x3 reveal-card"
              >
                {/* Top Visual with Absolute Matching Image */}
                <div className="package-card-3x3__visual">
                  <img
                    src={pkg.image}
                    alt={title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = pkg.fallbackImages?.[0] || '/images/travel.png';
                    }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(6, 21, 45, 0.65) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }} />
                  
                  {/* Floating Badges */}
                  <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', right: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                    <span className="pill-tag" style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'var(--surface-glass-modal)', borderColor: 'var(--border-accent)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {t.packagesSection.packageLabel} {pkg.num}
                    </span>
                    <span className="pill-tag" style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'var(--surface-glass-modal)', color: 'var(--text-primary)', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      {badge}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="package-card-3x3__content">
                  
                  {/* Location & Title */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <MapPin size={13} flexShrink={0} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {location}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35, margin: 0, minHeight: '2.8rem' }}>
                      {title}
                    </h3>
                  </div>

                  {/* Quick Specs */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.65rem 0', borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} color="var(--accent-cyan)" />
                      {duration}
                    </span>
                    <span>·</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Users size={13} color="var(--accent-cyan)" />
                      {groupSize}
                    </span>
                  </div>

                  {/* Short Overview snippet */}
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {overview}
                  </p>

                  {/* Price & Action Row */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: '0.85rem', marginTop: 'auto', borderTop: '1px solid var(--divider)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                        {price}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginInlineStart: '0.45rem' }}>
                        {pricePeriod}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
                      <button
                        onClick={() => onSelectPackageDetails(pkg)}
                        className="btn-secondary"
                        style={{ padding: '0.6rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center', width: '100%', minWidth: 0 }}
                        title={t.packagesSection.quickView}
                      >
                        <Eye size={14} flexShrink={0} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.packagesSection.quickView}</span>
                      </button>

                      <button
                        onClick={() => onOpenBooking({ packageTitle: title, price })}
                        className="btn-primary"
                        style={{ padding: '0.6rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center', width: '100%', minWidth: 0 }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.packagesSection.bookThis}</span>
                        <ArrowUpRight size={13} color="#ffffff" className="rtl-mirror" flexShrink={0} />
                      </button>
                    </div>
                  </div>

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
            <span>{isArabic ? `باقة ${activeIdx + 1} من ${filtered.length}` : `Package ${activeIdx + 1} of ${filtered.length}`}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
