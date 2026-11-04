import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Phone, Star } from 'lucide-react';
import { companyInfo } from '../data/seadunesData';
import { gsap } from 'gsap';

export default function Hero({ onOpenBooking }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-billboard', { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.9, delay: 0.1 })
        .fromTo('.hero-card-left', { opacity: 0, x: -35 }, { opacity: 1, x: 0, duration: 0.85 }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      style={{ 
        position: 'relative', 
        paddingTop: '6rem', 
        paddingBottom: '2.5rem',
        paddingLeft: 'clamp(1rem, 3vw, 2.5rem)',
        paddingRight: 'clamp(1rem, 3vw, 2.5rem)',
        maxWidth: '1440px', 
        margin: '0 auto' 
      }}
    >
      {/* Outer Billboard Card (Expanded Size, Rounded Corners & Background Video) */}
      <div 
        className="hero-billboard"
        style={{
          position: 'relative',
          minHeight: '700px',
          borderRadius: '2.75rem',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(2rem, 5vw, 4.5rem)',
          background: '#040e1f'
        }}
      >
        {/* Full-Bleed High-Adrenaline Jet Ski Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/Untitled-design-55.png"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: 1
          }}
        >
          <source src="/videos/hero-jetski.mp4" type="video/mp4" />
          <source src="/videos/hero-coastal-jetski.mp4" type="video/mp4" />
        </video>

        {/* Desktop: Floating Content Card on the Left (100% Preserved) */}
        <div 
          className="hero-card-left desktop-only"
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: '560px',
            width: '100%',
            background: 'var(--surface-glass-modal)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderRadius: '2.25rem',
            padding: 'clamp(2.25rem, 3.5vw, 3.25rem)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-glass)',
            margin: '1.5rem 0'
          }}
        >
          {/* Subtitle / Eyebrow */}
          <div style={{ 
            fontSize: '0.92rem', 
            fontWeight: 600, 
            color: 'var(--accent-cyan)', 
            marginBottom: '0.9rem',
            letterSpacing: '0.02em'
          }}>
            Luxury rides, expert instructors, and iconic scenery.
          </div>

          {/* Title (Thin / Elegant Poppins Variant) */}
          <h1 style={{ 
            fontSize: 'clamp(2.1rem, 3.2vw, 2.75rem)', 
            fontWeight: 300, 
            letterSpacing: '-0.3px', 
            lineHeight: 1.25, 
            color: 'var(--text-primary)', 
            margin: '0 0 1.15rem' 
          }}>
            Explore Oman’s Coastline with Top-Rated Jet Ski Rentals
          </h1>

          {/* Description */}
          <p style={{ 
            fontSize: '0.98rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.65, 
            margin: '0 0 2rem' 
          }}>
            Ride past world-famous islands and coastlines on a private jet ski tour. We provide expert guides, premium machines, and free HD photos so you can just focus on the ride.
          </p>

          {/* Action Buttons Row */}
          <div className="hero-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary"
              style={{ 
                flex: 1, 
                minWidth: '160px',
                padding: '0.95rem 1.6rem', 
                fontSize: '0.95rem',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.45)'
              }}
            >
              <span>BOOK NOW</span>
              <ArrowUpRight size={16} color="#ffffff" />
            </button>

            <a
              href={`tel:${companyInfo.phone}`}
              className="btn-secondary"
              style={{ 
                flex: 1, 
                minWidth: '170px',
                padding: '0.95rem 1.5rem', 
                fontSize: '0.92rem',
                justifyContent: 'center',
                borderColor: 'var(--border-accent)',
                color: 'var(--text-primary)'
              }}
            >
              <Phone size={15} color="var(--accent-cyan)" />
              <span style={{ fontWeight: 700 }}>Call: {companyInfo.phone}</span>
            </a>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--divider)', marginBottom: '1.5rem' }} />

          {/* Social Proof / Review Row (Expanded Avatars & Clear Rating) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', flexWrap: 'wrap' }}>
            {/* Avatar Stack */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/1-2.png"
                alt="Rider"
                style={{ width: '2.35rem', height: '2.35rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--surface-glass-modal)', marginLeft: 0 }}
              />
              <img
                src="/images/1-3.png"
                alt="Rider"
                style={{ width: '2.35rem', height: '2.35rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--surface-glass-modal)', marginLeft: '-9px' }}
              />
              <img
                src="/images/1-4.png"
                alt="Rider"
                style={{ width: '2.35rem', height: '2.35rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--surface-glass-modal)', marginLeft: '-9px' }}
              />
              <img
                src="/images/1-5.png"
                alt="Rider"
                style={{ width: '2.35rem', height: '2.35rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--surface-glass-modal)', marginLeft: '-9px' }}
              />
            </div>

            {/* Stars & Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                5.0 (350+ reviews)
              </span>
            </div>
          </div>

        </div>

        {/* Mobile: 100% Video Visibility (No card/modal box, max 3 words, pure action) */}
        <div 
          className="hero-mobile-overlay mobile-only"
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: '1.5rem 0.5rem 0.5rem',
            background: 'transparent'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2.35rem, 8.5vw, 3rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-1px',
            lineHeight: 1.05,
            margin: 0,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.7)',
            textTransform: 'uppercase'
          }}>
            Ride The Waves
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary"
              style={{
                flex: 1,
                minWidth: '135px',
                padding: '0.85rem 1.5rem',
                fontSize: '0.92rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
                border: 'none',
                color: '#ffffff',
                justifyContent: 'center'
              }}
            >
              <span>Book Now</span>
              <ArrowUpRight size={15} color="#ffffff" />
            </button>

            <a
              href={`tel:${companyInfo.phone}`}
              className="btn-secondary"
              style={{
                flex: 1,
                minWidth: '135px',
                padding: '0.85rem 1.25rem',
                fontSize: '0.88rem',
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.35)',
                color: '#ffffff',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                justifyContent: 'center'
              }}
            >
              <Phone size={14} color="#38bdf8" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
