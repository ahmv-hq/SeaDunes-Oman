import React, { useState } from 'react';
import { X, MapPin, Calendar, Users, Check, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PackageDetailModal({ packageData, onClose, onBookPackage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { isArabic, t } = useLanguage();

  if (!packageData) return null;

  const title = isArabic && packageData.titleAr ? packageData.titleAr : packageData.title;
  const badge = isArabic && packageData.badgeAr ? packageData.badgeAr : packageData.badge;
  const location = isArabic && packageData.locationAr ? packageData.locationAr : packageData.location;
  const duration = isArabic && packageData.durationAr ? packageData.durationAr : packageData.duration;
  const groupSize = isArabic && packageData.groupSizeAr ? packageData.groupSizeAr : packageData.groupSize;
  const price = isArabic && packageData.priceAr ? packageData.priceAr : packageData.price;
  const pricePeriod = isArabic && packageData.pricePeriodAr ? packageData.pricePeriodAr : packageData.pricePeriod;
  const overview = isArabic && packageData.overviewAr ? packageData.overviewAr : packageData.overview;
  const highlights = isArabic && packageData.highlightsAr ? packageData.highlightsAr : packageData.highlights;
  const inclusions = isArabic && packageData.inclusionsAr ? packageData.inclusionsAr : packageData.inclusions;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          padding: 0,
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Cover Image with High-Contrast Dark Gradient */}
        <div style={{ position: 'relative', height: '340px', width: '100%', overflow: 'hidden' }}>
          <img
            src={packageData.image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = packageData.fallbackImages?.[0] || '/images/travel.png';
            }}
          />
          {/* Always dark gradient overlay so white text is crystal clear */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, rgba(3, 10, 22, 0.95) 0%, rgba(3, 10, 22, 0.55) 55%, rgba(0, 0, 0, 0.25) 100%)' 
          }} />
          
          <button
            onClick={onClose}
            aria-label="Close details"
            style={{ 
              position: 'absolute', 
              top: '1.25rem', 
              right: isArabic ? 'auto' : '1.25rem', 
              left: isArabic ? '1.25rem' : 'auto',
              background: 'rgba(0, 0, 0, 0.6)', 
              border: '1px solid rgba(255, 255, 255, 0.25)', 
              color: '#ffffff', 
              borderRadius: '50%', 
              width: '2.5rem', 
              height: '2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              zIndex: 10
            }}
          >
            <X size={18} />
          </button>

          <div style={{ 
            position: 'absolute', 
            bottom: '1.5rem', 
            left: 'clamp(1.25rem, 3vw, 2rem)', 
            right: 'clamp(1.25rem, 3vw, 2rem)', 
            zIndex: 2, 
            color: '#ffffff' 
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="pill-tag" style={{ background: 'rgba(2, 132, 199, 0.35)', color: '#38bdf8', borderColor: '#38bdf8', fontSize: '0.75rem', fontWeight: 700 }}>
                Package {packageData.num}
              </span>
              <span className="pill-tag" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '0.72rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.06em' }}>
                {badge}
              </span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.5px', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: 1.25 }}>
              {title}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.65rem', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.85)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={14} color="#38bdf8" />
                {location}
              </span>
              <span>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} color="#38bdf8" />
                {duration}
              </span>
              <span>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Users size={14} color="#38bdf8" />
                {groupSize}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--divider)', 
          background: 'var(--bg-elevated)', 
          padding: '0 1.5rem',
          gap: '1.5rem'
        }}>
          {[
            { id: 'overview', label: t.detailModal.tabOverview },
            { id: 'highlights', label: t.detailModal.tabHighlights },
            { id: 'inclusions', label: t.detailModal.tabInclusions }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.92rem',
                padding: '0.9rem 0.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body Content */}
        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
          {activeTab === 'overview' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                {isArabic ? 'وصف تفصيلي للباقة' : 'Experience Summary'}
              </h4>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 1.5rem' }}>
                {overview}
              </p>

              {packageData.fallbackImages && packageData.fallbackImages.length > 0 && (
                <div>
                  <h5 style={{ fontSize: '0.88rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
                    {isArabic ? 'معرض صور الجولة' : 'Tour Gallery Views'}
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                    {packageData.fallbackImages.map((img, i) => (
                      <div key={i} style={{ borderRadius: '1rem', overflow: 'hidden', height: '120px', border: '1px solid var(--border-glass)' }}>
                        <img src={img} alt="Tour View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'highlights' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {isArabic ? 'أبرز المحطات والأنشطة' : 'Signature Expedition Highlights'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <div style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', background: 'var(--surface-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check size={12} color="var(--accent-cyan)" />
                    </div>
                    <span style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {isArabic ? 'ما تشمله رسوم الباقة' : 'Everything Covered Under Package Rate'}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.85rem' }}>
                {inclusions.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.75rem 1rem', background: 'var(--surface-pill)', borderRadius: '0.85rem', border: '1px solid var(--border-glass)' }}>
                    <Check size={14} color="var(--accent-cyan)" flexShrink={0} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer with Booking CTA */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1.25rem clamp(1.25rem, 3vw, 2.25rem)', 
          borderTop: '1px solid var(--divider)', 
          background: 'var(--bg-elevated)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {price}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.04em', marginTop: '3px' }}>
              {pricePeriod} · {t.detailModal.priceNotice}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookPackage({ packageTitle: title, price });
            }}
            className="btn-primary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
          >
            <span>{t.detailModal.btnBookNow}</span>
            <ArrowUpRight size={16} color="#ffffff" className="rtl-mirror" />
          </button>
        </div>

      </div>
    </div>
  );
}
