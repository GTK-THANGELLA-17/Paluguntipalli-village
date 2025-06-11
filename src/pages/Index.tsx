import { useState, useEffect, useRef, useCallback } from "react";
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
import WhyUseApp from "@/components/WhyUseApp";
import ApplicationUpdates from "@/components/ApplicationUpdates";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Optimized weather fetch with error handling and caching
  const fetchWeatherTemp = useCallback(async () => {
    try {
      // Check cache first
      const cached = localStorage.getItem('weather_cache');
      const cacheTime = localStorage.getItem('weather_cache_time');
      
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 30 * 60 * 1000) {
        return;
      }
      
      const apiKey = "4d8fb5b93d4af21d66a2948710284366";
      const lat = 14.5138;
      const lon = 79.8927;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error("Weather data not available");
      
      const data = await response.json();
      const temp = Math.round(data.main.temp);
      
      // Cache the result
      localStorage.setItem('weather_cache', JSON.stringify(temp));
      localStorage.setItem('weather_cache_time', Date.now().toString());
      
    } catch (err) {
      console.warn("Weather fetch failed, using fallback:", err);
    }
  }, []);

  // Optimized progress bar with RAF
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    
    const updateProgress = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      const totalProgress = (seconds + milliseconds / 1000) * (100 / 60);
      setProgress(totalProgress);
      
      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Enhanced audio and scroll handler with performance optimizations
  useEffect(() => {
    const audio = new Audio('/Bgm Sounds.mp3');
    audio.loop = true;
    audio.volume = 0.15;
    audio.preload = 'none'; // Better performance
    audioRef.current = audio;
    
    const attemptAutoplay = () => {
      if (audioRef.current && !isScrolled) {
        audioRef.current.play()
          .then(() => {
            setIsAudioPlaying(true);
          })
          .catch(err => {
            console.warn("Autoplay prevented by browser:", err);
          });
      }
    };
    
    const autoplayTimer = setTimeout(attemptAutoplay, 4000);
    
    // Throttled scroll handler with better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 100;
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
            if (scrolled && audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
      }
    };

    // Use passive listeners for better performance
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
  }, [isScrolled]);

  // Enhanced loading timer with preload
  useEffect(() => {
    const preloadCriticalImages = () => {
      const criticalImages = [
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400"
      ];
      
      criticalImages.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    preloadCriticalImages();
    
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(loadTimer);
  }, []);

  // Enhanced AOS and language initialization
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      mirror: false,
      easing: 'ease-out-cubic',
      offset: 50,
      disable: window.innerWidth < 768 ? 'mobile' : false,
    });

    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['en', 'te', 'hi'].includes(savedLanguage)) {
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
    document.documentElement.lang = i18n.language;
  }, [i18n]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {loading && <LoadingScreen />}
      
      <Navbar isAudioPlaying={isAudioPlaying} audioRef={audioRef} setIsAudioPlaying={setIsAudioPlaying} />
      
      <DateTimeDisplay isScrolled={isScrolled} />
      
      <Hero />
      <About />
      <Gallery />
      <TodaysEvents />
      <Events />
      <Weather />
      <PlacesToVisit />
      <ApplicationUpdates />
      <WhyUseApp />
      <Views360 />
      <Members />
      <Announcements />
      
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title text-[#000000] dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <div className="max-w-7xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
