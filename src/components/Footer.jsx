import React, { useState } from 'react';
import { companyInfo } from '../data/seadunesData';
import { Phone, Mail, MapPin, ArrowUpRight, Check, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const currentYear = new Date().getFullYear();

export default function Footer({ onOpenBooking }) {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { isArabic, t } = useLanguage();

  const handleSub = (e) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubscribed(true);
      setEmailSub('');
    }
  };

  return (
    <footer id="contact" style={{ 
      padding: 'clamp(3.5rem, 5.5vw, 5.5rem) clamp(1.25rem, 3.5vw, 2.5rem) clamp(2rem, 3vw, 3rem)',
      borderTop: '1px solid var(--divider)',
      background: 'var(--bg-surface)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* ROW 1: Summary & Newsletter Box */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
          gap: '2rem', 
          alignItems: 'center',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--divider)'
        }}>
          <div>
            <p style={{ 
              fontSize: '1rem', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.7, 
              maxWidth: '520px',
              margin: 0
            }}>
              {t.footer.summary}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '440px', width: '100%' }}>
            <div style={{ fontSize: '0.8rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              {t.footer.subHeading}
            </div>
            
            <form onSubmit={handleSub} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              background: 'var(--input-bg)', 
              borderRadius: '9999px', 
              padding: '0.35rem', 
              border: '1px solid var(--input-border)',
              boxShadow: 'var(--card-shadow)'
            }}>
              <input
                type="email"
                required
                placeholder={t.footer.emailPlaceholder}
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  outline: 'none', 
                  padding: '0.5rem 1rem', 
                  fontSize: '0.85rem', 
                  color: 'var(--input-text)', 
                  width: '100%' 
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem', flexShrink: 0 }}>
                {subscribed ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="#ffffff" /> {t.footer.btnSubscribed}
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {t.footer.btnSubscribe} <Send size={12} className="rtl-mirror" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ROW 2: Giant Oversized Brand Typography (Stylized Wordmark - No Logo Image) */}
        <div style={{ 
          padding: 'clamp(2rem, 4vw, 3.5rem) 0', 
          borderBottom: '1px solid var(--divider)',
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden'
        }}>
          <h1 style={{ 
            fontSize: isArabic ? 'clamp(1.75rem, 7.5vw, 7.5rem)' : 'clamp(1.5rem, 8.5vw, 8.5rem)', 
            fontWeight: 900, 
            letterSpacing: isArabic ? '0' : '-0.03em', 
            lineHeight: 1.05, 
            margin: 0,
            textTransform: isArabic ? 'none' : 'uppercase',
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 45%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            filter: 'drop-shadow(0 15px 30px var(--glow-color))',
            maxWidth: '100%'
          }}>
            {t.brand.footerBanner}
          </h1>
        </div>

        {/* ROW 3: 4 Column Contact & Navigation */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', 
          gap: 'clamp(1.75rem, 3.5vw, 2.75rem)', 
          padding: 'clamp(2.5rem, 4vw, 3.5rem) 0',
          borderBottom: '1px solid var(--divider)'
        }}>
          
          {/* Headquarters */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              {t.footer.headquarters}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', marginBottom: '0.65rem' }}>
                <MapPin size={16} color="var(--accent-cyan)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>
                  {t.footer.addressLines[0]}<br />
                  {t.footer.addressLines[1]}<br />
                  {t.footer.addressLines[2]}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.65rem', paddingInlineStart: '1.45rem' }}>
                {t.footer.workingHours}
              </div>
            </div>
          </div>

          {/* Direct Phone & WhatsApp */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              {t.footer.dispatch}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <a 
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                <Phone size={15} color="var(--accent-cyan)" />
                <span style={{ fontWeight: 600 }}>{companyInfo.phone}</span>
              </a>

              <a 
                href={`tel:${companyInfo.secondaryPhone.replace(/[^0-9+]/g, '')}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--text-muted)', textDecoration: 'none' }}
              >
                <Phone size={15} />
                <span>{companyInfo.secondaryPhone} (VIP Line)</span>
              </a>

              <a 
                href={`mailto:${companyInfo.email}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                <Mail size={15} color="var(--accent-cyan)" />
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              {t.footer.quickNav}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
              <a href="#packages" className="nav-link" style={{ color: 'var(--text-secondary)' }}>
                {t.nav.packages}
              </a>
              <a href="#fleet" className="nav-link" style={{ color: 'var(--text-secondary)' }}>
                {t.nav.fleet}
              </a>
              <a href="#about" className="nav-link" style={{ color: 'var(--text-secondary)' }}>
                {t.nav.about}
              </a>
              <a href="#how-it-works" className="nav-link" style={{ color: 'var(--text-secondary)' }}>
                {t.nav.howItWorks}
              </a>
              <button 
                onClick={() => onOpenBooking()} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  textAlign: 'inherit', 
                  color: 'var(--accent-cyan)', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{t.nav.bookRide}</span>
                <ArrowUpRight size={13} className="rtl-mirror" />
              </button>
            </div>
          </div>

          {/* Booking Dispatch Button */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: isArabic ? 'none' : 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              {isArabic ? 'الحجز السريع' : 'Instant Reservation'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0 0 1rem' }}>
              {isArabic 
                ? 'تواصل معنا مباشرة عبر واتساب لحجز اليخوت الخاصة أو عربات الصحراء دون أي تأخير.' 
                : 'Message our local team on WhatsApp for guaranteed same-day dispatch and private charters.'}
            </p>
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1.25rem' }}
            >
              <span>{t.nav.bookRide}</span>
              <ArrowUpRight size={14} color="#ffffff" className="rtl-mirror" />
            </button>
          </div>

        </div>

        {/* ROW 4: Copyright & Clean Meta */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '2rem', 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}>
          <div>
            © {currentYear} {t.brand.footerBanner}. {t.footer.copyright}
          </div>
          <div>
            {t.footer.legal}
          </div>
        </div>

      </div>
    </footer>
  );
}
