import React, { useState } from 'react';
import { X, MessageSquare, Mail, CheckCircle2 } from 'lucide-react';
import { companyInfo, tourPackages, fleetVehicles } from '../data/seadunesData';
import { useLanguage } from '../context/LanguageContext';

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const { isArabic, t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [activity, setActivity] = useState(
    initialData.packageTitle || 
    (isArabic && tourPackages[0].titleAr ? tourPackages[0].titleAr : tourPackages[0].title)
  );
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState(isArabic ? 'صباحاً (08:30)' : 'Morning (08:30 AM)');
  const [guests, setGuests] = useState(initialData.guests || (isArabic ? 'شخصان' : '2 Guests'));
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, '');
    const message = isArabic 
      ? `*طلب حجز مغامرة - سي ديونز عمان*%0A%0A` +
        `*الاسم:* ${name || 'ضيف سي ديونز'}%0A` +
        `*رقم الهاتف:* ${phone || 'غير محدد'}%0A` +
        `*الجولة / الفعالية:* ${activity}%0A` +
        `*التاريخ المفضل:* ${date}%0A` +
        `*التوقيت:* ${timeSlot}%0A` +
        `*عدد الأشخاص:* ${guests}%0A` +
        `*موقع الاستقبال:* ${pickupLocation || 'مسقط'}%0A` +
        `*ملاحظات خاصة:* ${notes || 'لا يوجد'}`
      : `*SeaDunes Adventure Booking Inquiry*%0A%0A` +
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
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(1.5rem, 4vw, 2.25rem)',
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
              {t.bookingModal.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.35rem 0 0' }}>
              {t.bookingModal.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'var(--surface-pill)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '2.25rem',
              height: '2.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle2 size={36} color="var(--accent-cyan)" />
            </div>
            <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {t.bookingModal.confirmedTitle}
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.75rem' }}>
              {t.bookingModal.confirmedDesc}
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              {t.bookingModal.closeBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {t.bookingModal.labelName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'مثال: محمد البوسعيدي' : 'e.g. John Smith'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.75rem',
                    color: 'var(--input-text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {t.bookingModal.labelPhone} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+968 9XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.75rem',
                    color: 'var(--input-text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {t.bookingModal.labelActivity}
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: '0.75rem',
                  color: 'var(--input-text)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <optgroup label={isArabic ? 'باقات الجولات السياحية' : 'Signature Tour Packages'}>
                  {tourPackages.map(p => (
                    <option key={p.id} value={isArabic && p.titleAr ? p.titleAr : p.title}>
                      {isArabic && p.titleAr ? `${p.num}. ${p.titleAr} (${p.priceAr})` : `${p.num}. ${p.title} (${p.price})`}
                    </option>
                  ))}
                </optgroup>
                <optgroup label={isArabic ? 'أسطول المركبات والدراجات' : 'Fleet & Ride Rentals'}>
                  {fleetVehicles.map(v => (
                    <option key={v.id} value={isArabic && v.nameAr ? v.nameAr : v.name}>
                      {isArabic && v.nameAr ? `${v.nameAr} (${v.rateHourlyAr})` : `${v.name} (${v.rateHourly})`}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {t.bookingModal.labelDate}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.75rem',
                    color: 'var(--input-text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {t.bookingModal.labelTime}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.75rem',
                    color: 'var(--input-text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value={isArabic ? 'صباحاً (08:30)' : 'Morning (08:30 AM)'}>{isArabic ? 'صباحاً (08:30)' : 'Morning (08:30 AM)'}</option>
                  <option value={isArabic ? 'بعد الظهر (01:30)' : 'Afternoon (01:30 PM)'}>{isArabic ? 'بعد الظهر (01:30)' : 'Afternoon (01:30 PM)'}</option>
                  <option value={isArabic ? 'ساعة الغروب (04:30)' : 'Sunset Golden Hour (04:30 PM)'}>{isArabic ? 'ساعة الغروب (04:30)' : 'Sunset Golden Hour (04:30 PM)'}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {t.bookingModal.labelGuests}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.75rem',
                    color: 'var(--input-text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value={isArabic ? 'شخص واحد' : '1 Guest'}>{isArabic ? 'شخص واحد' : '1 Guest'}</option>
                  <option value={isArabic ? 'شخصان' : '2 Guests'}>{isArabic ? 'شخصان' : '2 Guests'}</option>
                  <option value={isArabic ? '3 إلى 4 أشخاص' : '3-4 Guests'}>{isArabic ? '3 إلى 4 أشخاص' : '3-4 Guests'}</option>
                  <option value={isArabic ? '5 إلى 8 أشخاص' : '5-8 Guests'}>{isArabic ? '5 إلى 8 أشخاص' : '5-8 Guests'}</option>
                  <option value={isArabic ? 'مجموعة كبيرة (9+ أشخاص)' : '9+ Group VIP'}>{isArabic ? 'مجموعة كبيرة (9+ أشخاص)' : '9+ Group VIP'}</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {t.bookingModal.labelPickup}
              </label>
              <input
                type="text"
                placeholder={isArabic ? 'اسم الفندق أو المنطقة في مسقط' : 'e.g. W Muscat Hotel, Shatti Al Qurum'}
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: '0.75rem',
                  color: 'var(--input-text)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {t.bookingModal.labelNotes}
              </label>
              <textarea
                rows="2"
                placeholder={isArabic ? 'أي متطلبات خاصة أو استفسارات إضافية' : 'Any dietary preferences, child seat needs, etc.'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: '0.75rem',
                  color: 'var(--input-text)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ 
                  width: '100%', 
                  justifyContent: 'center', 
                  padding: '0.95rem', 
                  fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                }}
              >
                <MessageSquare size={17} color="#ffffff" />
                <span>{t.bookingModal.btnWhatsApp}</span>
              </button>

              <button
                type="button"
                onClick={handleEmailBooking}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.9rem' }}
              >
                <Mail size={16} />
                <span>{t.bookingModal.btnEmail}</span>
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
