
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { changeLanguage, translateAllElements } from "@/i18n";
import { toast } from "sonner";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Apply translations to the entire document
  useEffect(() => {
    // Translate on initial load
    translateAllElements();
    
    // Listen for language change events
    document.addEventListener('languageChanged', () => {
      // Run translation multiple times to catch all dynamic elements
      translateAllElements();
      
      // Run again after any potential DOM updates
      setTimeout(translateAllElements, 500);
      setTimeout(translateAllElements, 1500);
    });
    
    // Translate after route changes or major component updates
    const observer = new MutationObserver((mutations) => {
      let shouldTranslate = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldTranslate = true;
        }
      });
      
      if (shouldTranslate) {
        translateAllElements();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      document.removeEventListener('languageChanged', translateAllElements);
      observer.disconnect();
    };
  }, []);

  // Enhanced language change function with animation and better feedback
  const handleLanguageChange = (langCode: string) => {
    // Show language change animation
    const overlay = document.createElement('div');
    overlay.className = 'language-change-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.2)';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    // Add flag animation
    const flag = document.createElement('div');
    const lang = languages.find(l => l.code === langCode);
    flag.textContent = lang?.flag || '🌐';
    flag.style.position = 'fixed';
    flag.style.top = '50%';
    flag.style.left = '50%';
    flag.style.transform = 'translate(-50%, -50%) scale(0)';
    flag.style.fontSize = '5rem';
    flag.style.zIndex = '10000';
    flag.style.opacity = '0';
    flag.style.transition = 'all 0.6s ease';
    document.body.appendChild(flag);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      flag.style.opacity = '1';
      flag.style.transform = 'translate(-50%, -50%) scale(1.5)';
      
      setTimeout(() => {
        const lang = languages.find(l => l.code === langCode);
        changeLanguage(langCode);
        flag.style.opacity = '0';
        flag.style.transform = 'translate(-50%, -50%) scale(0.5)';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.removeChild(flag);
          
          // Provide feedback that language changed
          toast.success(`Language changed to ${lang?.name}`, {
            description: "The page has been translated.",
            duration: 3000,
          });
          
          // Force update all form elements and input placeholders
          document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            const placeholder = el.getAttribute('placeholder');
            if (placeholder) {
              el.setAttribute('placeholder', t(placeholder));
            }
          });
          
        }, 300);
      }, 600);
    });
    
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a language"
          className="flex items-center gap-2 bg-white dark:bg-[#222222] dark:text-white dark:border-white/20 transition-all duration-300"
        >
          <Globe className={theme === 'light' ? "text-green-600" : "text-white"} size={16} />
          <span>
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 dark:bg-[#222222] dark:border-white/20">
        <div className="space-y-1 p-2">
          {languages.map((language) => (
            <motion.div
              key={language.code}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={`w-full justify-between text-left dark:text-white dark:hover:bg-white/10 ${
                  i18n.language === language.code ? 'bg-heritage/10 dark:bg-white/10' : ''
                }`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg mr-1">{language.flag}</span>
                  {language.name}
                </span>
                {i18n.language === language.code && (
                  <Check className="h-4 w-4 text-green-600 dark:text-white" />
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
