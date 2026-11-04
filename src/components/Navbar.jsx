import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight, Sun, Moon, Compass, Zap, Info, CheckCircle2, MapPin, Phone } from 'lucide-react';

export default function Navbar({ onOpenBooking, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open to prevent awkward background scrolling
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      background: 'var(--surface-glass-nav)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-glass)',
      boxShadow: theme === 'light' ? '0 4px 20px rgba(2, 132, 199, 0.06)' : 'none',
      transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.25rem, 4vw, 3rem)',
        height: '4.75rem',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        
        {/* Left: Brand Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 0.85rem)', textDecoration: 'none', minWidth: 0 }}>
          <img
            src="/images/Sea-Dunes-and-AO-Drive-logo.png"
            alt="SeaDunes Oman"
            style={{ height: 'clamp(2.1rem, 5vw, 2.5rem)', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/Sea-Dunes-logo-small.png';
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 'clamp(1.1rem, 3.2vw, 1.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              Sea<span style={{ color: 'var(--accent-cyan)' }}>Dunes</span>
            </span>
            <span style={{ fontSize: 'clamp(0.56rem, 1.6vw, 0.65rem)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Sultanate of Oman
            </span>
          </div>
        </a>

        {/* Center: Clean Minimal Navigation Links (Desktop Only - Strictly hidden on mobile) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-only">
          <a href="#packages" className="nav-link">
            Packages
          </a>
          <a href="#fleet" className="nav-link">
            Fleet & Buggies
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#how-it-works" className="nav-link">
            How It Works
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>

        {/* Right: Desktop Controls & Clean Mobile 3-Lines Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Light / Dark Mode Switcher (Desktop Only) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--surface-pill)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              flexShrink: 0
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun size={17} color="#38bdf8" />
            ) : (
              <Moon size={17} color="#0284c7" />
            )}
          </button>

          {/* Book Adventure Button (Desktop Only) */}
          <button
            onClick={() => onOpenBooking()}
            className="btn-primary desktop-only"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            <span>Book Adventure</span>
            <ArrowUpRight size={14} color="#ffffff" />
          </button>

          {/* Mobile 3-Lines Menu Button (Right side on mobile only) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-only"
            aria-label="Toggle Menu"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: mobileOpen ? 'var(--accent-gradient)' : 'var(--surface-pill)', 
              border: '1px solid var(--border-glass)', 
              color: mobileOpen ? '#ffffff' : 'var(--text-primary)', 
              cursor: 'pointer', 
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.75rem',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              flexShrink: 0
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Full-Screen Spacious Mobile Drawer (Rendered via Portal to avoid parent stacking context clipping) */}
      {mobileOpen && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(6, 21, 45, 0.98)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          animation: 'modalFadeIn 0.2s ease-out'
        }}>
          {/* Top Bar inside Menu for Easy Closing & Consistency */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.25rem',
            height: '4.75rem',
            borderBottom: '1px solid var(--border-glass)',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src="/images/Sea-Dunes-and-AO-Drive-logo.png"
                alt="SeaDunes Oman"
                style={{ height: '2.1rem', width: 'auto', objectFit: 'contain' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                  Sea<span style={{ color: 'var(--accent-cyan)' }}>Dunes</span>
                </span>
                <span style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Sultanate of Oman
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--accent-gradient)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.35)'
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu Options: Spacious, Touch-Friendly Glass Cards */}
          <div style={{
            padding: '1.5rem 1.25rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            flex: 1
          }}>
            {/* Theme Appearance Pill Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.15rem',
              borderRadius: '1.25rem',
              background: 'var(--surface-pill)',
              border: '1px solid var(--border-glass)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {theme === 'dark' ? <Moon size={18} color="#38bdf8" /> : <Sun size={18} color="#0284c7" />}
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  background: 'var(--surface-glass-modal)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>

            {/* Nav Link Cards (Big, Beautiful, Effortless to tap) */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Tour Packages (3x3)', href: '#packages', icon: Compass, badge: '9 Signature' },
                { label: 'Fleet & Buggies', href: '#fleet', icon: Zap, badge: 'Polaris & Jet Skis' },
                { label: 'About SeaDunes', href: '#about', icon: Info, badge: 'Since 2005' },
                { label: 'How It Works', href: '#how-it-works', icon: CheckCircle2, badge: '4 Steps' },
                { label: 'Contact & Muscat Office', href: '#contact', icon: MapPin, badge: 'Muscat, Oman' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.05rem 1.25rem',
                      borderRadius: '1.25rem',
                      background: 'var(--surface-glass-card)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      boxShadow: 'var(--card-shadow)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        width: '2.4rem',
                        height: '2.4rem',
                        borderRadius: '0.75rem',
                        background: 'var(--surface-pill)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-cyan)'
                      }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.badge}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} color="var(--accent-cyan)" />
                  </a>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem' }}>
              <button
                onClick={() => { setMobileOpen(false); onOpenBooking(); }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}
              >
                <span>Book Adventure Now</span>
                <ArrowUpRight size={16} color="#ffffff" />
              </button>

              <a
                href="tel:+96895800000"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}
              >
                <Phone size={16} color="var(--accent-cyan)" />
                <span>Call: +968 9580 0000</span>
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
