import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight, Sun, Moon, Compass, Zap, Info, CheckCircle2, MapPin, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { companyInfo } from '../data/seadunesData';

export default function Navbar({ onOpenBooking, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isArabic, toggleLanguage, t } = useLanguage();

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
        
        {/* Left: Stylized Wordmark (Pure Typography Branding - No Image Logo) */}
        <a href="/" className="brand-wordmark" aria-label="SeaDunes Oman">
          <div className="brand-wordmark-main">
            <span className="brand-wordmark-title">
              Sea<span className="brand-wordmark-dunes">Dunes</span>
            </span>
            <span className="brand-wordmark-country">Oman</span>
          </div>
        </a>

        {/* Center: Clean Minimal Navigation Links (Desktop Only - Strictly hidden on mobile & tablets) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.85rem, 1.8vw, 1.75rem)' }} className="nav-desktop-only">
          <a href="#packages" className="nav-link">
            {t.nav.packages}
          </a>
          <a href="#fleet" className="nav-link">
            {t.nav.fleet}
          </a>
          <a href="#about" className="nav-link">
            {t.nav.about}
          </a>
          <a href="#how-it-works" className="nav-link">
            {t.nav.howItWorks}
          </a>
          <a href="#contact" className="nav-link">
            {t.nav.contact}
          </a>
        </nav>

        {/* Right: Desktop Controls & Clean Mobile 3-Lines Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Language Switcher Toggle (Arabic / English) */}
          <button
            onClick={toggleLanguage}
            aria-label={t.nav.switchLangAria}
            title={t.nav.switchLangAria}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              background: 'var(--surface-pill)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              padding: '0 0.95rem',
              height: '2.5rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.86rem',
              fontWeight: 700,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.25s ease'
            }}
          >
            <Globe size={16} color="var(--accent-cyan)" />
            <span>{t.nav.switchLang}</span>
          </button>

          {/* Light / Dark Mode Switcher (Desktop Only) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="nav-desktop-only"
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
            className="btn-primary nav-desktop-only"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            <span>{t.nav.bookRide}</span>
            <ArrowUpRight size={14} color="#ffffff" className="rtl-mirror" />
          </button>

          {/* Mobile 3-Lines Menu Button (Right side on mobile & tablet) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-only"
            aria-label="Open Navigation Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--surface-pill)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <Menu size={20} color="var(--text-primary)" />
          </button>

        </div>
      </div>

      {/* Modern High-End Mobile Menu Modal Drawer (Pure Touch-First) */}
      {mobileOpen && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
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
            {/* Stylized Wordmark in Mobile Header (No Image Logo) */}
            <div className="brand-wordmark">
              <div className="brand-wordmark-main">
                <span className="brand-wordmark-title" style={{ fontSize: '1.1rem' }}>
                  Sea<span className="brand-wordmark-dunes">Dunes</span>
                </span>
                <span className="brand-wordmark-country" style={{ fontSize: '0.72rem' }}>Oman</span>
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
            {/* Controls Bar: Theme & Language Switchers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {/* Language Switcher Card */}
              <button
                onClick={toggleLanguage}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'var(--surface-pill)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                <Globe size={18} color="var(--accent-cyan)" />
                <span>{t.nav.switchLang}</span>
              </button>

              {/* Theme Switcher Card */}
              <button
                onClick={toggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'var(--surface-pill)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {theme === 'dark' ? <Sun size={18} color="#38bdf8" /> : <Moon size={18} color="#0284c7" />}
                <span>{theme === 'dark' ? (isArabic ? 'الوضع النهاري' : 'Light Mode') : (isArabic ? 'الوضع الليلي' : 'Dark Mode')}</span>
              </button>
            </div>

            {/* Nav Link Cards (Big, Beautiful, Effortless to tap) */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { 
                  label: isArabic ? 'باقات الجولات (3×3)' : 'Tour Packages (3x3)', 
                  href: '#packages', 
                  icon: Compass, 
                  badge: isArabic ? '9 باقات مميزة' : '9 Signature' 
                },
                { 
                  label: isArabic ? 'الأسطول وعربات البولاريس' : 'Fleet & Buggies', 
                  href: '#fleet', 
                  icon: Zap, 
                  badge: isArabic ? 'بولاريس ودراجات مائية' : 'Polaris & Jet Skis' 
                },
                { 
                  label: isArabic ? 'عن سي ديونز' : 'About SeaDunes', 
                  href: '#about', 
                  icon: Info, 
                  badge: isArabic ? 'منذ 2005' : 'Since 2005' 
                },
                { 
                  label: isArabic ? 'كيف تبدأ رحلتك' : 'How It Works', 
                  href: '#how-it-works', 
                  icon: CheckCircle2, 
                  badge: isArabic ? '4 خطوات سهلة' : '4 Steps' 
                },
                { 
                  label: isArabic ? 'تواصل معنا ومكتب مسقط' : 'Contact & Muscat Office', 
                  href: '#contact', 
                  icon: MapPin, 
                  badge: isArabic ? 'مسقط، سلطنة عمان' : 'Muscat, Oman' 
                },
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
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.badge}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} color="var(--accent-cyan)" className="rtl-mirror" />
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
                <span>{t.nav.bookRide}</span>
                <ArrowUpRight size={16} color="#ffffff" className="rtl-mirror" />
              </button>

              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}
              >
                <Phone size={16} color="var(--accent-cyan)" />
                <span>{isArabic ? `اتصل بنا: ${companyInfo.phone}` : `Call: ${companyInfo.phone}`}</span>
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
