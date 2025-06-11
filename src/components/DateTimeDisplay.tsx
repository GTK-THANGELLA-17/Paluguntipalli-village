
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface DateTimeDisplayProps {
  isScrolled: boolean;
}

const DateTimeDisplay = ({ isScrolled }: DateTimeDisplayProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [weatherTemp, setWeatherTemp] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Optimized weather fetch with error handling and caching
  const fetchWeatherTemp = useCallback(async () => {
    try {
      const cached = localStorage.getItem('weather_cache');
      const cacheTime = localStorage.getItem('weather_cache_time');
      
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 30 * 60 * 1000) {
        setWeatherTemp(JSON.parse(cached));
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
      
      localStorage.setItem('weather_cache', JSON.stringify(temp));
      localStorage.setItem('weather_cache_time', Date.now().toString());
      
      setWeatherTemp(temp);
    } catch (err) {
      console.warn("Weather fetch failed, using fallback:", err);
      setWeatherTemp(32);
    }
  }, []);

  useEffect(() => {
    fetchWeatherTemp();
    const weatherInterval = setInterval(fetchWeatherTemp, 30 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, [fetchWeatherTemp]);

  // Optimized progress bar with RAF
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

  // Optimized date/time timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isScrolled && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-[72px] left-0 right-0 z-40 flex justify-center items-center py-2 bg-gradient-to-r from-white/95 via-heritage/30 to-white/95 dark:from-[#252525]/95 dark:via-slate/40 dark:to-[#252525]/95 backdrop-blur-lg shadow-xl border-b border-heritage/20 dark:border-white/20"
          style={{ height: '50px' }}
        >
          <motion.div 
            className="flex flex-col items-center sm:flex-row sm:gap-3 relative overflow-hidden rounded-2xl px-4 py-2 bg-white/80 dark:bg-[#252525]/80 backdrop-blur-lg border border-heritage/30 dark:border-white/30 shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Enhanced animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-heritage/20 dark:via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Date display */}
            <motion.p 
              className="text-[#000000] dark:text-white text-sm font-semibold relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              {currentDateTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </motion.p>
            
            {/* Enhanced separator */}
            <motion.div 
              className="hidden sm:block w-1.5 h-1.5 bg-heritage dark:bg-white rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Time display */}
            <motion.p 
              className="text-[#000000] dark:text-white font-semibold text-sm flex items-center relative z-10"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 1 }}
            >
              <span>
                {currentDateTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </span>
              {weatherTemp !== null && (
                <motion.span 
                  className="ml-2 bg-blue-100 dark:bg-blue-900/60 px-2 py-1 rounded-full text-blue-800 dark:text-blue-100 text-xs backdrop-blur-sm border border-blue-200 dark:border-blue-700 shadow-md font-semibold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {weatherTemp}°C
                </motion.span>
              )}
            </motion.p>
            
            {/* Enhanced progress bar */}
            <div className="absolute -bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-full">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-heritage via-blue-500 to-purple-600"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DateTimeDisplay;
