
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import te from './locales/te.json';
import hi from './locales/hi.json';

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi }
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span']
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Enhanced language change function with better error handling
export const changeLanguage = async (language: string) => {
  try {
    // Cancel any pending language changes
    if (window.languageChangeTimeout) {
      clearTimeout(window.languageChangeTimeout);
    }
    
    await i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    document.documentElement.lang = language;

    // Force immediate re-render of React components
    const event = new CustomEvent('languageChanged', { 
      detail: { language },
      bubbles: true 
    });
    document.dispatchEvent(event);
    
    // Apply translations immediately without delay
    window.languageChangeTimeout = setTimeout(() => {
      applyTranslations();
    }, 50) as any;
    
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// Simplified translation function that works better with React
export const applyTranslations = () => {
  // Update document attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translated = i18n.t(key);
      if (translated !== key) {
        el.textContent = translated;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    const placeholder = el.getAttribute('data-i18n-placeholder') || el.getAttribute('placeholder');
    if (placeholder) {
      const translated = i18n.t(placeholder);
      if (translated !== placeholder) {
        el.setAttribute('placeholder', translated);
      }
    }
  });
};

export default i18n;
