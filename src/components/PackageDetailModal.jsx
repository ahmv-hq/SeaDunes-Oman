import React from 'react';
import { X, MapPin, Calendar, Users, Check, ArrowUpRight } from 'lucide-react';

export default function PackageDetailModal({ packageData, onClose, onBookPackage }) {
  if (!packageData) return null;

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
          overflowY: 'auto'
        }}
      >
        {/* Cover Image with High-Contrast Dark Gradient (Guarantees 100% Text Visibility in Both Light & Dark Modes) */}
        <div style={{ position: 'relative', height: '340px', width: '100%', overflow: 'hidden' }}>
          <img
            src={packageData.image}
            alt={packageData.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/Untitled-design-55.png';
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
              right: '1.25rem', 
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

          {/* Text Container over Cover Image - 100% High Contrast */}
          <div style={{ position: 'absolute', bottom: '1.5rem', left: 'clamp(1rem, 3.5vw, 2rem)', right: 'clamp(1rem, 3.5vw, 2rem)', zIndex: 5 }}>
            <span style={{ 
              fontSize: '0.78rem', 
              padding: '3px 12px', 
              background: 'rgba(2, 132, 199, 0.25)', 
              border: '1px solid #38bdf8', 
              color: '#38bdf8', 
              marginBottom: '0.65rem', 
              display: 'inline-block', 
              fontWeight: 700,
              borderRadius: '9999px'
            }}>
              Package {packageData.num} · {packageData.badge}
            </span>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', 
              fontWeight: 800, 
              color: '#ffffff', 
              margin: '0 0 0.65rem', 
              letterSpacing: '-0.5px',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {packageData.title}
            </h2>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.85rem', 
              fontSize: '0.92rem', 
              color: 'rgba(255, 255, 255, 0.95)', 
              flexWrap: 'wrap',
              textShadow: '0 1px 6px rgba(0,0,0,0.8)'
            }}>
              <span>{packageData.location}</span>
              <span>·</span>
              <span>{packageData.duration}</span>
              <span>·</span>
              <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1.1rem' }}>{packageData.price}</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Overview
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              {packageData.overview}
            </p>
          </div>

          <div style={{ background: 'var(--surface-glass)', borderRadius: '1.5rem', padding: '1.75rem', border: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.15rem' }}>
              Itinerary Highlights
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {packageData.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  <span style={{ width: '1.6rem', height: '1.6rem', borderRadius: '50%', background: 'var(--surface-pill)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800, border: '1px solid var(--border-accent)' }}>
                    {i + 1}
                  </span>
                  <span style={{ lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
              Inclusions & Amenities
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {packageData.inclusions.map((inc, i) => (
                <span key={i} className="pill-tag" style={{ fontSize: '0.85rem' }}>
                  <Check size={13} color="var(--accent-cyan)" />
                  <span>{inc}</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--divider)', flexWrap: 'wrap' }}>
            <button onClick={onClose} className="btn-secondary" style={{ padding: '0.75rem 1.75rem' }}>
              <span>Close</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookPackage({ packageTitle: packageData.title, price: packageData.price });
              }}
              className="btn-primary"
              style={{ padding: '0.75rem 1.75rem' }}
            >
              <span>Book This Package</span>
              <ArrowUpRight size={14} color="#ffffff" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
