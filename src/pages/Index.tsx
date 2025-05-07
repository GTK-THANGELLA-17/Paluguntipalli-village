
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Weather from "@/components/Weather";
import Views360 from "@/components/Views360";
import Members from "@/components/Members";
import Announcements from "@/components/Announcements";
import Footer from "@/components/Footer";
import PlacesToVisit from "@/components/PlacesToVisit";
import LoadingScreen from "@/components/LoadingScreen";
import ContactForm from "@/components/ContactForm";
import TodaysEvents from "@/components/TodaysEvents";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Import the fallback images for preloading
const fallbackImages = [
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1920&q=80"
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [weatherTemp, setWeatherTemp] = useState<number | null>(null);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [progress, setProgress] = useState(0);

  // Fetch weather temperature for the date/time display
  useEffect(() => {
    const fetchWeatherTemp = async () => {
      try {
        const apiKey = "4d8fb5b93d4af21d66a2948710284366"; // Free public API key
        const lat = 14.5138; // Approximate lat for Paluguntipalli
        const lon = 79.8927; // Approximate long for Paluguntipalli
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) throw new Error("Weather data not available");
        
        const data = await response.json();
        setWeatherTemp(data.main.temp);
      } catch (err) {
        console.error("Error fetching weather:", err);
        // Fallback temperature
        setWeatherTemp(32);
      }
    };

    fetchWeatherTemp();
    
    // Update weather every 30 minutes
    const weatherInterval = setInterval(fetchWeatherTemp, 30 * 60 * 1000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Progress bar animation for date/time display
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 600);
    
    return () => clearInterval(progressInterval);
  }, []);

  // Audio initialization and scroll handler
  useEffect(() => {
    // Create audio element
    const audio = new Audio('/Bgm Sounds.mp3');
    audio.loop = true;
    audio.volume = 0.5; // Set initial volume to 50%
    audioRef.current = audio;
    
    // Try to autoplay when the page loads
    const attemptAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsAudioPlaying(true);
            console.log("Audio autoplay successful");
          })
          .catch(err => {
            console.warn("Autoplay prevented by browser:", err);
            // Most browsers require user interaction before playing audio
          });
      }
    };
    
    // Try autoplay after a short delay (gives time for page to load)
    const autoplayTimer = setTimeout(() => {
      attemptAutoplay();
    }, 2000);
    
    // Handle scroll to stop audio when user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
      } else {
        setIsScrolled(false);
      }
    };

    // Handle visibility change to control audio when tab is inactive
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearTimeout(autoplayTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      mirror: false,
      easing: 'ease-out',
      offset: 30
    });

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'te', 'hi'].includes(browserLang)) {
        i18n.changeLanguage(browserLang);
      }
    }

    document.documentElement.lang = i18n.language;
    
    return () => {
      clearInterval(timer);
    };
  }, [i18n]);

  // Load screen handler
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    
    return () => clearTimeout(loadTimer);
  }, []);

  // Preload critical assets
  useEffect(() => {
    // Preload critical images
    const imageUrls = [
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
    
    // Add theme transition styles
    const style = document.createElement('style');
    style.textContent = `
      .theme-transition {
        transition: background-color 1s ease, color 1s ease;
      }
      
      .theme-transition-overlay {
        position: fixed;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 0;
        transition: opacity 1s ease;
      }
      
      .theme-transition-to-dark {
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
        animation: fadeInOut 1s ease;
      }
      
      .theme-transition-to-light {
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);
        animation: fadeInOut 1s ease;
      }
      
      @keyframes fadeInOut {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // Track mouse position for theme transition effect
    const trackMouse = (e) => {
      const x = e.clientX / window.innerWidth * 100;
      const y = e.clientY / window.innerHeight * 100;
      document.documentElement.style.setProperty('--x', `${x}%`);
      document.documentElement.style.setProperty('--y', `${y}%`);
    };
    
    window.addEventListener('mousemove', trackMouse);
    
    return () => {
      window.removeEventListener('mousemove', trackMouse);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden will-change-scroll">
      {loading && <LoadingScreen />}
      
      <Navbar isAudioPlaying={isAudioPlaying} audioRef={audioRef} setIsAudioPlaying={setIsAudioPlaying} />
      
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 flex justify-center items-center py-2 bg-gradient-to-r from-white/80 via-heritage/20 to-white/80 dark:from-[#252525]/80 dark:via-slate/30 dark:to-[#252525]/80 backdrop-blur-sm shadow-sm"
          >
            <div className="flex flex-col items-center sm:flex-row sm:gap-3 relative">
              {/* Date display with pulse effect */}
              <motion.p 
                className="text-[#000000] dark:text-white text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentDateTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </motion.p>
              
              {/* Time display with pulse effect */}
              <motion.p 
                className="text-[#000000] dark:text-white font-medium text-sm flex items-center"
                animate={{ 
                  scale: [1, 1.03, 1],
                  transition: { 
                    repeat: Infinity, 
                    repeatDelay: 5,
                    duration: 1
                  }
                }}
              >
                {currentDateTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
                {weatherTemp !== null && (
                  <motion.span 
                    className="ml-2 bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {weatherTemp}°C
                  </motion.span>
                )}
              </motion.p>
              
              {/* Animated progress bar */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-heritage via-blue-500 to-heritage"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Hero />
      <About />
      <Gallery />
      <TodaysEvents />
      <Events />
      <Weather />
      <PlacesToVisit />
      <Views360 />
      <Members />
      <Announcements />
      
      <section id="contact" className="py-16 bg-white dark:bg-[#252525]">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-[#000000] dark:text-white">Contact Us</h2>
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
