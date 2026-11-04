import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import AboutStory from './components/AboutStory';
import PackagesSection from './components/PackagesSection';
import FleetSection from './components/FleetSection';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import PackageDetailModal from './components/PackageDetailModal';
import { companyInfo } from './data/seadunesData';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { initScrollAnimations } from './utils/scrollAnimations';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState({});
  const [selectedPackageDetails, setSelectedPackageDetails] = useState(null);
  
  // Theme state: dark or light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('seadunes-theme') || 'dark';
  });

  // Scroll tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('seadunes-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Scroll listener for progress bar and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (totalScroll / windowHeight) * 100;
      setScrollProgress(scrollPercent);

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize GSAP ScrollTrigger animations
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => cleanup && cleanup();
  }, []);

  const handleOpenBooking = (initialData = {}) => {
    setBookingInitialData(initialData);
    setBookingModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper" data-theme={theme}>
      
      {/* Scroll Progress Bar at the Top */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Fixed Navbar with Theme Switcher */}
      <Navbar 
        onOpenBooking={handleOpenBooking}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="main-wrapper">
        {/* Full-bleed Hero with GSAP entrance */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Minimalist Statistics with Animated Counter */}
        <Statistics />

        {/* Editorial Story */}
        <AboutStory onOpenBooking={handleOpenBooking} />

        {/* 9 Featured Tour Packages (Vita Travel Split Cards) */}
        <PackagesSection 
          onOpenBooking={handleOpenBooking}
          onSelectPackageDetails={(pkg) => setSelectedPackageDetails(pkg)}
        />

        {/* High-Torque Machine Fleet & Ride Rentals */}
        <FleetSection onOpenBooking={handleOpenBooking} />

        {/* How It Works */}
        <HowItWorks />
      </main>

      {/* Footer with Dedicated Full-Width Typography Banner & Clean Columns */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Floating Action Buttons */}
      <div style={{ 
        position: 'fixed', 
        bottom: '1.75rem', 
        right: '1.75rem', 
        zIndex: 900, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        gap: '0.85rem' 
      }}>
        <a
          href={`https://wa.me/${companyInfo.phone.replace(/[^0-9]/g, '')}?text=Hello%20SeaDunes%20Oman,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20adventure.`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ 
            padding: '0.85rem 1.4rem', 
            boxShadow: '0 12px 30px rgba(0, 102, 255, 0.45)', 
            textDecoration: 'none' 
          }}
        >
          <MessageSquare size={17} />
          <span>Chat on WhatsApp</span>
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{ 
              background: 'var(--surface-pill)', 
              border: '1px solid var(--border-glass)', 
              color: 'var(--text-primary)', 
              borderRadius: '50%', 
              width: '2.75rem', 
              height: '2.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--card-shadow)',
              transition: 'all 0.25s ease'
            }}
          >
            <ArrowUp size={17} />
          </button>
        )}
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={bookingInitialData}
      />

      <PackageDetailModal
        packageData={selectedPackageDetails}
        onClose={() => setSelectedPackageDetails(null)}
        onBookPackage={(data) => handleOpenBooking(data)}
      />

    </div>
  );
}
