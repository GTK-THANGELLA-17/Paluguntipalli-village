
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ThemeToggleProps {
  mobile?: boolean;
}

const ThemeToggle = ({ mobile = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRay, setShowRay] = useState(false);

  // Handle the toggle with animation lock to prevent multiple rapid clicks
  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleTheme();
    
    // For sun rays or moon glow effects
    setShowRay(true);
    setTimeout(() => {
      setShowRay(false);
    }, 700);
    
    // Release animation lock after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  // Debug logging to track theme changes
  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  const buttonSize = mobile ? 'h-7 w-7 min-w-7' : '';
  const iconSize = mobile ? 16 : 20;

  return (
    <div className="relative">
      {/* Light/dark effect overlay */}
      {showRay && (
        <motion.div
          className={`absolute -z-10 rounded-full ${
            theme === "dark" 
              ? "bg-gradient-radial from-blue-800/30 to-transparent" 
              : "bg-gradient-radial from-yellow-300/30 to-transparent"
          }`}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 2.5 }}
          exit={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.7 }}
          style={{
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      )}
      
      <Button
        variant="ghost"
        size={mobile ? "sm" : "icon"}
        onClick={handleToggle}
        disabled={isAnimating}
        className={`relative z-10 rounded-full transition-all duration-700 hover:scale-110 ${buttonSize} ${
          theme === 'dark' 
            ? 'bg-[#333333] text-white hover:bg-[#444444]' 
            : 'bg-[#B5C7EB]/30 text-[#000000] hover:bg-[#B5C7EB]/50'
        }`}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ 
              scale: 0.5, 
              opacity: 0, 
              rotate: theme === 'dark' ? -180 : 0,
              y: theme === 'dark' ? 10 : -10
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: 0,
              y: 0
            }}
            exit={{ 
              scale: 0, 
              opacity: 0,
              rotate: theme === 'dark' ? 0 : 180,
              y: theme === 'dark' ? -10 : 10
            }}
            transition={{ 
              duration: 0.7, 
              type: "spring", 
              stiffness: 200,
              damping: 10 
            }}
            className="absolute"
          >
            {theme === 'dark' ? (
              <Sun size={iconSize} className="text-yellow-300 animate-pulse">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              </Sun>
            ) : (
              <Moon size={iconSize} className="text-blue-800">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
              </Moon>
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
};

export default ThemeToggle;
