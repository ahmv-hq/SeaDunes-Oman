import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutStory({ onOpenBooking }) {
  const { isArabic, t } = useLanguage();

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head */}
        <div className="animate-head" style={{ marginBottom: '2.5rem', maxWidth: '860px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 700, lineHeight: 1.3, letterSpacing: isArabic ? '0' : '-1px', color: 'var(--text-primary)', margin: 0 }}>
            {t.about.heading}
          </h2>
        </div>

        {/* 2-Column Split: Image on Left, Editorial Story on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.5rem, 3.5vw, 2.5rem)', alignItems: 'center' }}>
          
          {/* Visual with Rounded Corners */}
          <div style={{ 
            borderRadius: '1.75rem', 
            overflow: 'hidden', 
            boxShadow: 'var(--card-shadow)', 
            border: '1px solid var(--border-glass)',
            position: 'relative',
            maxHeight: '440px'
          }}>
            <img
              src="/images/Wahiba-Sands2.png"
              alt="SeaDunes Wahiba Sands Desert Safari"
              style={{ width: '100%', height: 'clamp(240px, 42vw, 440px)', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/Wahiba-Sands.png';
              }}
            />
          </div>

          {/* Narrative & Value Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <p style={{ 
              fontSize: 'clamp(1.02rem, 1.6vw, 1.22rem)', 
              fontWeight: 500, 
              lineHeight: 1.7, 
              color: 'var(--text-secondary)', 
              letterSpacing: isArabic ? '0' : '-0.2px',
              margin: 0
            }}>
              {t.about.narrative}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
              gap: 'clamp(0.85rem, 2vw, 1.25rem)', 
              paddingTop: '1.25rem', 
              borderTop: '1px solid var(--divider)' 
            }}>
              <div className="statistic-card" style={{ padding: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-1px' }}>2005</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>{t.about.statFounded}</div>
              </div>
              <div className="statistic-card" style={{ padding: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-1px' }}>#1</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>{t.about.statPrice}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              <button onClick={() => onOpenBooking()} className="btn-primary" style={{ padding: '0.75rem 1.5rem', flex: 1, minWidth: '160px', justifyContent: 'center' }}>
                <span>{t.about.btnReserve}</span>
                <ArrowUpRight size={15} color="#ffffff" className="rtl-mirror" />
              </button>
              <a href="#contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', flex: 1, minWidth: '160px', justifyContent: 'center' }}>
                <span>{t.about.btnContact}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
