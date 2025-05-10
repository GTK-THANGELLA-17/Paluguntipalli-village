
import { useState } from "react";
import { Heart, Mail, MapPin, ExternalLink } from "lucide-react";
import DeveloperModal from "@/components/DeveloperModal";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const { t } = useTranslation();

  return (
    <footer className="bg-village-primary text-white pt-16 pb-8 dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">Paluguntipalli</h3>
            <p className="mb-6 text-gray-300 dark:text-gray-200">
              {t("Discover the rich cultural heritage of our beautiful village in Andhra Pradesh. Experience traditions that have been preserved for generations.")}
            </p>
            <Button 
              variant="custom"
              className="bg-black text-white hover:bg-gray-800 dark:bg-charcoal dark:hover:bg-gray-800"
              onClick={() => setShowDeveloperModal(true)}
            >
              {t("CLICK HERE TO KNOW ABOUT DEVELOPER")}
            </Button>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">{t("Quick Links")}</h4>
            <ul className="space-y-3">
              {[
                { name: t('Home'), href: '#home' },
                { name: t('About'), href: '#about' },
                { name: t('Gallery'), href: '#gallery' },
                { name: t('Places'), href: '#places' },
                { name: t('Events'), href: '#main-events' },
                { name: t('Weather'), href: '#village-weather' },
                { name: t('360° Views'), href: '#views360' },
                { name: t('Contact'), href: '#contact' },
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="hover:text-heritage transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">{t("Contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={18} className="text-heritage mr-2" />
                <span>Paluguntipalli, Andhra Pradesh</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-heritage mr-2" />
                <span>thangellagadidamalla@gmail.com</span>
              </li>
              <li className="flex items-center">
                <ExternalLink size={18} className="text-heritage mr-2" />
                <a 
                  href="https://www.google.com/maps/place/Paluguntipalli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-heritage transition-colors duration-300"
                >
                  {t("View on Google Maps")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2024 Paluguntipalli - {t("The Cultural Heritage")}</p>
          <Button 
            variant="custom"
            className="mt-2 bg-black text-white hover:bg-gray-800 dark:bg-charcoal dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300"
            onClick={() => setShowDeveloperModal(true)}
          >
            {t("Developed with")} <Heart size={16} className="inline mx-1 text-red-500" /> {t("by G. Thangella")}
          </Button>
        </div>
      </div>
      
      <DeveloperModal 
        isOpen={showDeveloperModal}
        onClose={() => setShowDeveloperModal(false)}
      />
    </footer>
  );
};

export default Footer;
