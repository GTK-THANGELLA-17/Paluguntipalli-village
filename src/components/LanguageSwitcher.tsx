
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { changeLanguage } from "@/i18n";
import { toast } from "sonner";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Enhanced language change function with immediate feedback
  const handleLanguageChange = async (langCode: string) => {
    if (isChanging || langCode === i18n.language) return;
    
    setIsChanging(true);
    setOpen(false);

    try {
      // Show immediate visual feedback
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] pointer-events-none';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.2s ease';
      document.body.appendChild(overlay);

      // Add flag animation
      const flag = document.createElement('div');
      const lang = languages.find(l => l.code === langCode);
      flag.textContent = lang?.flag || '🌐';
      flag.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 3rem;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
      `;
      document.body.appendChild(flag);

      // Animate in
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        flag.style.opacity = '1';
        flag.style.transform = 'translate(-50%, -50%) scale(1.2)';
      });

      // Change language immediately
      await changeLanguage(langCode);
      
      // Force React components to re-render
      window.dispatchEvent(new Event('resize'));
      
      // Animate out
      setTimeout(() => {
        flag.style.opacity = '0';
        flag.style.transform = 'translate(-50%, -50%) scale(0.5)';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
          if (document.body.contains(overlay)) document.body.removeChild(overlay);
          if (document.body.contains(flag)) document.body.removeChild(flag);
        }, 200);
      }, 400);

      // Success feedback
      toast.success(`Language changed to ${lang?.name}`, {
        description: "Translation applied successfully",
        duration: 2000,
      });

    } catch (error) {
      console.error('Language change error:', error);
      toast.error("Failed to change language", {
        description: "Please try again",
        duration: 3000,
      });
    } finally {
      setTimeout(() => setIsChanging(false), 600);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a language"
          disabled={isChanging}
          className="flex items-center gap-2 bg-white dark:bg-[#222222] dark:text-white dark:border-white/20 transition-all duration-300 text-xs sm:text-sm"
        >
          <Globe className={theme === 'light' ? "text-green-600" : "text-white"} size={14} />
          <span className="hidden sm:inline">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="sm:hidden">
            {currentLanguage.flag}
          </span>
          <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] sm:w-[200px] p-0 dark:bg-[#222222] dark:border-white/20">
        <div className="space-y-1 p-2">
          {languages.map((language) => (
            <motion.div
              key={language.code}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={`w-full justify-between text-left text-xs sm:text-sm dark:text-white dark:hover:bg-white/10 ${
                  i18n.language === language.code ? 'bg-heritage/10 dark:bg-white/10' : ''
                } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isChanging}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">{language.flag}</span>
                  <span className="truncate">{language.name}</span>
                </span>
                {i18n.language === language.code && (
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-white flex-shrink-0" />
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
