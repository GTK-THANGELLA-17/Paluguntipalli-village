
import { ArrowDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

// Updated video URLs with proper paths
const videoUrls = [
  "/Village video.mp4",
];

// Updated image URLs with absolute URLs for better reliability
const fallbackImages = [
  "/Village.jpg",
];

const Hero = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();
  
  // Handle video slideshow
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videoUrls.length);
      setIsVideoLoaded(false);
    }, 10000); // Change video every 10 seconds
    
    return () => clearTimeout(timer);
  }, [currentVideo]);
  
  // Handle video loading with improved error handling
  useEffect(() => {
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };
    
    const handleError = () => {
      console.warn("Video failed to load:", videoUrls[currentVideo]);
      setIsVideoLoaded(false); // Ensure fallback image is shown
    };
    
    if (videoRef.current) {
      videoRef.current.addEventListener('canplay', handleCanPlay);
      videoRef.current.addEventListener('error', handleError);
      
      // Force reload the video when source changes
      videoRef.current.load();
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('canplay', handleCanPlay);
          videoRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [currentVideo]);

  // Scene indicators with improved animations
  const renderSceneIndicators = () => {
    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {Array.from({ length: videoUrls.length }).map((_, i) => (
          <motion.button
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: currentVideo === i ? 1.2 : 0.8,
              opacity: currentVideo === i ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentVideo === i ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => setCurrentVideo(i)}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      id="home" 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative overflow-hidden"
    >
      {/* Video Background with Fallback Image and enhanced transition */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className={`absolute inset-0`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <video
            ref={videoRef}
            src={videoUrls[currentVideo]}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={() => setCurrentVideo((prev) => (prev + 1) % videoUrls.length)}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        {/* Fallback image displayed during video loading with improved transition */}
        <motion.div 
          className={`absolute inset-0 bg-cover bg-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: !isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{ 
            backgroundImage: `url(${fallbackImages[currentVideo]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>
      
      {/* Scene indicators */}
      {renderSceneIndicators()}

      {/* Hero Content with enhanced animations */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Paluguntipalli
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white mb-8 font-light drop-shadow-md backdrop-blur-sm py-2 px-4 rounded-lg bg-black/10 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Where Heritage Meets Harmony
        </motion.p>
      </div>

      {/* Improved scroll indicator animation */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
