import React from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function AboutStory({ onOpenBooking }) {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        
        {/* Head - Clean without tags */}
        <div className="animate-head" style={{ marginBottom: '2.5rem', maxWidth: '860px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0 }}>
            Not just trips, pure Arabian adrenaline that captures the heart and soul.
          </h2>
        </div>

        {/* 2-Column Split: Image on Left, Editorial Story on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
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
              src="/images/Untitled-design-54.png"
              alt="SeaDunes Wahiba Sands Safari"
              style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
            />
          </div>

          {/* Narrative & Value Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <p style={{ 
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', 
              fontWeight: 500, 
              lineHeight: 1.6, 
              color: 'var(--text-secondary)', 
              letterSpacing: '-0.2px',
              margin: 0
            }}>
              SeaDunes was founded in 2005 as a premier partnership in Muscat. Over two decades, we have pioneered unique combo expeditions uniting high-speed coastal jet skiing and yachting across Daymaniyat Islands with high-torque desert buggy and quad safaris across Wahiba Sands.
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
              gap: '1.25rem', 
              paddingTop: '1.25rem', 
              borderTop: '1px solid var(--divider)' 
            }}>
              <div className="statistic-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-1px' }}>2005</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.2rem' }}>Year Founded in Muscat</div>
              </div>
              <div className="statistic-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-1px' }}>#1</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.2rem' }}>Best Price Guaranteed</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              <button onClick={() => onOpenBooking()} className="btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                <span>Reserve Your Tour</span>
                <ArrowUpRight size={15} color="#ffffff" />
              </button>
              <a href="#contact" className="btn-secondary" style={{ padding: '0.75rem 1.75rem' }}>
                <Compass size={15} color="var(--accent-cyan)" />
                <span>Visit Muscat Office</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
