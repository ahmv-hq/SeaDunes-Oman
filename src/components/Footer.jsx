import React, { useState } from 'react';
import { companyInfo } from '../data/seadunesData';
import { Phone, Mail, MapPin, ArrowUpRight, Check, Send } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
        
        {/* ROW 1: Summary & Newsletter Box (No + tags) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem', 
          alignItems: 'center',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--divider)'
        }}>
          <div>
            <p style={{ 
              fontSize: '1rem', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6, 
              maxWidth: '520px',
              margin: 0
            }}>
              Pioneering luxury desert safaris, coastal yacht charters, and Polaris dune adventures across Oman since 2005. Verified local guides, best price guarantee, zero day-wasters.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '440px', width: '100%', justifySelf: 'end' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              Join 2,400+ seasonal subscribers
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
                placeholder="Enter email for seasonal rates"
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
                    <Check size={13} color="#ffffff" /> Joined
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Subscribe <Send size={12} />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ROW 2: Giant Oversized Brand Typography */}
        <div style={{ 
          padding: 'clamp(2rem, 4vw, 3.5rem) 0', 
          borderBottom: '1px solid var(--divider)',
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2.25rem, 9.2vw, 9.5rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            lineHeight: 0.9, 
            margin: 0,
            textTransform: 'uppercase',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            filter: 'drop-shadow(0 15px 30px var(--glow-color))'
          }}>
            Seadunes Oman
          </h1>
        </div>

        {/* ROW 3: 4 Column Contact & Navigation (Clean headings, no + tags) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
          gap: 'clamp(1.75rem, 3.5vw, 2.75rem)', 
          padding: 'clamp(2.5rem, 4vw, 3.5rem) 0',
          borderBottom: '1px solid var(--divider)'
        }}>
          
          {/* Headquarters */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              Headquarters
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', marginBottom: '0.65rem' }}>
                <MapPin size={16} color="var(--accent-cyan)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Alraya Tower, Floor 8<br />Ghala Business District, Muscat<br />Sultanate of Oman</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.65rem', paddingLeft: '1.45rem' }}>
                Open Daily: 07:30 AM to 10:00 PM (GST)
              </div>
            </div>
          </div>

          {/* Direct Phone & WhatsApp */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              Bookings & Dispatch
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <a href={`tel:${companyInfo.phone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.55rem', transition: 'color 0.2s' }}>
                <Phone size={14} color="var(--accent-cyan)" />
                <span style={{ fontWeight: 600 }}>{companyInfo.phone}</span>
              </a>
              <a href={`tel:${companyInfo.secondaryPhone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.55rem', transition: 'color 0.2s' }}>
                <Phone size={14} color="var(--accent-cyan)" />
                <span>{companyInfo.secondaryPhone}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.55rem', transition: 'color 0.2s' }}>
                <Mail size={14} color="var(--accent-cyan)" />
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Package Links */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              Featured Expeditions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.86rem' }}>
              <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Luxury Daymaniyat Yacht Cruise</a>
              <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Wahiba Sands Desert Safari</a>
              <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Wadi Shab Emerald Canyon Hike</a>
              <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Dimaniyat Turtle Snorkel Safari</a>
              <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Nizwa Fort & Jebel Shams Grand Canyon</a>
            </div>
          </div>

          {/* AO Drive Fleet App */}
          <div>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '1rem' }}>
              AO Drive Fleet App
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1rem' }}>
              Official mobile app for instant electric scooter unlocks and Polaris machine dispatch across Muscat.
            </p>
            <button onClick={() => onOpenBooking()} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.7rem 1rem' }}>
              <span>Reserve Adventure</span>
              <ArrowUpRight size={13} color="#ffffff" />
            </button>
          </div>

        </div>

        {/* ROW 4: Bottom Credits & Legal */}
        <div style={{ 
          paddingTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          fontSize: '0.82rem', 
          color: 'var(--text-muted)' 
        }}>
          <div>
            © 2005-2026 SeaDunes Oman & Active Oman Drive (AO Drive).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span>Oman Ministry of Heritage & Tourism License #4555</span>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
