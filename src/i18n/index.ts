
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
    lng: localStorage.getItem('i18nextLng') || 'en', // Get from localStorage or default to English
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false, // Prevents issues with suspense during initial loading
      transSupportBasicHtmlNodes: true, // Allow translation of basic HTML elements
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'] // DOM elements to preserve
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    // Make sure we translate all elements including dynamic ones
    parseMissingKeyHandler: (key) => {
      console.log(`Missing translation key: ${key}`);
      return key;
    }
  });

// Function to handle language change
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem('i18nextLng', language); // Store in localStorage
  document.documentElement.lang = language; // Update HTML lang attribute

  // Create a custom event to notify components that language has changed
  const event = new CustomEvent('languageChanged', { detail: { language } });
  document.dispatchEvent(event);
  
  // Apply translations with small delay to ensure DOM is updated
  setTimeout(() => {
    translateAllElements();
  }, 300);
};

// Function to translate all elements with text content - improved to catch more elements
export const translateAllElements = () => {
  // First pass: Get all text nodes in the document
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );
  
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    // Skip script and style tags
    if (
      node.parentNode.tagName !== 'SCRIPT' && 
      node.parentNode.tagName !== 'STYLE' &&
      node.textContent.trim()
    ) {
      textNodes.push(node);
    }
  }
  
  // Second pass: Get all elements with data attributes for translation
  const translateElements = (selector, attribute) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const key = el.getAttribute(attribute);
      if (key && i18n.t(key) !== key) {
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', i18n.t(key));
        } else {
          el.textContent = i18n.t(key);
        }
      }
    });
  };
  
  // Translate elements with various attributes
  translateElements('[data-i18n]', 'data-i18n');
  translateElements('[data-translate]', 'data-translate');
  translateElements('[data-trans]', 'data-trans');
  translateElements('[data-t]', 'data-t');
  translateElements('[translate]', 'translate');
  
  // Third pass: Translate specific elements by class or role
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, button, a, label, p, span, div');
  headings.forEach(el => {
    if (el.textContent && el.textContent.trim() && !el.hasAttribute('data-no-translate')) {
      const text = el.textContent.trim();
      const translated = i18n.t(text);
      if (translated !== text && !text.includes('</') && !text.includes('${')) {
        el.textContent = translated;
      }
    }
  });
  
  // Translate title attribute for tooltips
  const elementsWithTitle = document.querySelectorAll('[title]');
  elementsWithTitle.forEach(el => {
    const title = el.getAttribute('title');
    if (title) {
      el.setAttribute('title', i18n.t(title));
    }
  });
  
  // Mark as translated to avoid duplicate processing
  document.body.setAttribute('data-translated', 'true');
};

// Run initial translation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    translateAllElements();
  }, 500);
});

// Re-run translation after route changes or significant DOM updates
window.addEventListener('load', () => {
  setTimeout(() => {
    translateAllElements();
  }, 1000);
});

// Add CSS for language transitions
const style = document.createElement('style');
style.textContent = `
  .language-change-overlay {
    animation: fadeInOut 0.6s ease;
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes theme-icon-animation {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
  }
  
  [data-translated=true] * {
    transition: color 0.3s ease, background-color 0.3s ease;
  }
`;
document.head.appendChild(style);

export default i18n;
