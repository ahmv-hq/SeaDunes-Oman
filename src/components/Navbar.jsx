import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenBooking, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Center: Clean Minimal Navigation Links (No Clutter, Refined Luxury Text) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="mobile-hidden">
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

        {/* Right: Theme Toggle, Desktop CTA & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Light / Dark Mode Switcher (Clean Round Icon Button) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
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

          {/* Book Adventure Button (Desktop only to keep mobile header clean) */}
          <button
            onClick={() => onOpenBooking()}
            className="btn-primary desktop-only"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            <span>Book Adventure</span>
            <ArrowUpRight size={14} color="#ffffff" />
          </button>

          {/* Mobile hamburger (Clean Glass Pill on Mobile) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-visible"
            aria-label="Toggle Menu"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: mobileOpen ? 'var(--accent-gradient)' : 'var(--surface-pill)', 
              border: '1px solid var(--border-glass)', 
              color: mobileOpen ? '#ffffff' : 'var(--text-primary)', 
              cursor: 'pointer', 
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              flexShrink: 0
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'var(--surface-glass-modal)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          padding: '1.5rem 1.5rem 2rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          maxHeight: 'calc(100vh - 4.75rem)',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--divider)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Theme Appearance</span>
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--surface-pill)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? <><Sun size={15} color="#38bdf8" /> Light Mode</> : <><Moon size={15} color="#0284c7" /> Dark Mode</>}
            </button>
          </div>

          <a href="#packages" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Tour Packages (3x3)</span>
            <ArrowUpRight size={14} color="var(--accent-cyan)" />
          </a>
          <a href="#fleet" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Polaris Buggies & Jet Skis</span>
            <ArrowUpRight size={14} color="var(--accent-cyan)" />
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>About SeaDunes Oman</span>
            <ArrowUpRight size={14} color="var(--accent-cyan)" />
          </a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>How It Works</span>
            <ArrowUpRight size={14} color="var(--accent-cyan)" />
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Contact & Muscat Office</span>
            <ArrowUpRight size={14} color="var(--accent-cyan)" />
          </a>

          <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button
              onClick={() => { setMobileOpen(false); onOpenBooking(); }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              <span>Book Adventure Now</span>
              <ArrowUpRight size={15} color="#ffffff" />
            </button>
            <a
              href="tel:+96895800000"
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
            >
              <span>Call: +968 9580 0000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
