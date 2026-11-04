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
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <img
            src="/images/Sea-Dunes-and-AO-Drive-logo.png"
            alt="SeaDunes Oman"
            style={{ height: '2.5rem', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/Sea-Dunes-logo-small.png';
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Sea<span style={{ color: 'var(--accent-cyan)' }}>Dunes</span>
            </span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 600 }}>
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

        {/* Right: Theme Toggle & Single Primary CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
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
              WebkitBackdropFilter: 'blur(10px)'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun size={17} color="#38bdf8" />
            ) : (
              <Moon size={17} color="#0284c7" />
            )}
          </button>

          {/* Book Adventure Button */}
          <button
            onClick={() => onOpenBooking()}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            <span>Book Adventure</span>
            <ArrowUpRight size={14} color="#ffffff" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-visible"
            aria-label="Toggle Menu"
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.75rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--divider)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Appearance</span>
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

          <a href="#packages" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
            Tour Packages (1 - 9)
          </a>
          <a href="#fleet" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
            Polaris Buggies & ATVs
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
            About SeaDunes Oman
          </a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
            How It Works
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>
            Contact & Muscat Office
          </a>

          <button
            onClick={() => { setMobileOpen(false); onOpenBooking(); }}
            className="btn-primary"
            style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
          >
            <span>Book Adventure Now</span>
            <ArrowUpRight size={14} color="#ffffff" />
          </button>
        </div>
      )}
    </header>
  );
}
