import React, { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../i18n/translations';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('seadunes-lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('seadunes-lang', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const isArabic = language === 'ar';
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isArabic, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
