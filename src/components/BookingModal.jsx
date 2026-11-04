import React, { useState } from 'react';
import { X, MessageSquare, Mail, CheckCircle2 } from 'lucide-react';
import { companyInfo, tourPackages, fleetVehicles } from '../data/seadunesData';

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [activity, setActivity] = useState(initialData.packageTitle || tourPackages[0].title);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('Morning (08:30 AM)');
  const [guests, setGuests] = useState(initialData.guests || '2 Guests');
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, '');
    const message = `*SeaDunes Adventure Booking Inquiry*%0A%0A` +
      `*Name:* ${name || 'Explorer'}%0A` +
      `*Phone:* ${phone || 'Not provided'}%0A` +
      `*Activity/Tour:* ${activity}%0A` +
      `*Preferred Date:* ${date}%0A` +
      `*Time Slot:* ${timeSlot}%0A` +
      `*Group Size:* ${guests}%0A` +
      `*Pickup Hotel/Area:* ${pickupLocation || 'Muscat City'}%0A` +
      `*Special Requests:* ${notes || 'None'}`;

    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    setSubmitted(true);
  };

  const handleEmailBooking = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Booking Request: ${activity} - ${name}`);
    const body = encodeURIComponent(
      `SeaDunes Booking Details:\n\n` +
      `Name: ${name}\n` +
      `Phone/WhatsApp: ${phone}\n` +
      `Selected Adventure: ${activity}\n` +
      `Date: ${date}\n` +
      `Time: ${timeSlot}\n` +
      `Guests: ${guests}\n` +
      `Pickup: ${pickupLocation}\n` +
      `Notes: ${notes}\n`
    );
    window.location.href = `mailto:${companyInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--surface-pill)', border: '1px solid var(--border-glass)', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', background: 'var(--surface-pill)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border-accent)' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.5px' }}>
              Inquiry Sent Successfully!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Thank you, <strong style={{ color: 'var(--text-primary)' }}>{name || 'Adventurer'}</strong>! Our Muscat dispatch team will review your booking and message you directly via WhatsApp or phone within 15 minutes.
            </p>
            <button onClick={() => { setSubmitted(false); onClose(); }} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
              <span>Back to Expeditions</span>
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
                Book Your Adventure
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.45rem', lineHeight: 1.5 }}>
                Direct reservation with licensed local Omani guides · Guaranteed official rates.
              </p>
            </div>

            <form onSubmit={handleWhatsAppBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              
              {/* Activity */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Select Package or Machine
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  style={{ 
                    width: '100%', 
                    background: 'var(--input-bg)', 
                    color: 'var(--input-text)', 
                    border: '1px solid var(--input-border)', 
                    borderRadius: '0.85rem', 
                    padding: '0.85rem 1rem', 
                    fontSize: '0.92rem',
                    outline: 'none',
                    fontWeight: 500
                  }}
                >
                  <optgroup label="Tour Packages (1 - 9)">
                    {tourPackages.map(p => (
                      <option key={p.id} value={p.title}>{p.title} ({p.price})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Polaris Dune Buggies">
                    {fleetVehicles.filter(v => v.category === 'buggy').map(v => (
                      <option key={v.id} value={v.name}>{v.name} ({v.discountRate || v.rateHourly})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Quad ATVs">
                    {fleetVehicles.filter(v => v.category === 'quad').map(v => (
                      <option key={v.id} value={v.name}>{v.name} ({v.rateHourly})</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salim Al-Harthy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--input-border)', borderRadius: '0.85rem', padding: '0.85rem 1rem', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+968 ... or international"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--input-border)', borderRadius: '0.85rem', padding: '0.85rem 1rem', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Date & Group */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--input-border)', borderRadius: '0.85rem', padding: '0.85rem 1rem', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Group Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--input-border)', borderRadius: '0.85rem', padding: '0.85rem 1rem', fontSize: '0.92rem', outline: 'none' }}
                  >
                    <option value="1 Rider">1 Rider</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3-4 Guests">3 - 4 Guests</option>
                    <option value="5-8 Guests">5 - 8 Guests</option>
                    <option value="Private Charter (9+)">Private Group (9+)</option>
                  </select>
                </div>
              </div>

              {/* Pickup location */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Muscat Hotel or Residence Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. W Hotel Muscat, Chedi, Al Bustan Palace, or Airport"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--input-border)', borderRadius: '0.85rem', padding: '0.85rem 1rem', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.9rem 1.5rem' }}>
                  <MessageSquare size={17} />
                  <span>Instant Book via WhatsApp</span>
                </button>
                <button type="button" onClick={handleEmailBooking} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '0.9rem 1.5rem' }}>
                  <Mail size={17} color="var(--accent-cyan)" />
                  <span>Send Email Request</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
