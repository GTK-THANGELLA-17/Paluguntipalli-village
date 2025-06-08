
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const carouselImages = [
  {
    src: "/BUS STAND.jpg",
    alt: "Village Image 1"
  },
  {
    src: "/BUS STAND ROAD.jpg",
    alt: "Village Image 2"
  },
  {
    src: "/Hanuman Statue.jpg",
    alt: "Water surrounded by trees"
  },
  {
    src: "/VILLAGE START.jpg",
    alt: "Water surrounded by trees"
  },
  {
    src: "/Temple .jpg",
    alt: "Village Image 1"
  },
  {
    src: "/School.jpg",
    alt: "Village Image 2"
  },
  {
    src: "/Peerla chavidi 1.jpg",
    alt: "Village Image 3"
  },
  {
    src: "/Kasinayana Temple.jpg",
    alt: "River View"
  },
  
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState<boolean[]>(new Array(carouselImages.length).fill(true));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-heritage-bg dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Carousel */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px] border-4 border-heritage" data-aos="fade-right" data-aos-duration="1000">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {imageLoading[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="w-8 h-8 border-4 border-heritage border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(index)}
                  style={{ display: imageLoading[index] ? 'none' : 'block' }}
                />
              </div>
            ))}
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            {/* Carousel indicators */}
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-heritage' : 'bg-white/70'
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* About Text */}
          <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <h2 className="section-title text-[#403E43] dark:text-white">About Our Village</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-[#403E43] dark:text-white">
              Paluguntipalli is a picturesque village located in Andhra Pradesh, known for its serene environment and vibrant culture. Surrounded by lush greenery, it offers a tranquil escape from the hustle and bustle of city life.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-[#403E43] dark:text-white">
              The village is home to several historic temples and traditional festivals celebrated with great enthusiasm by the locals. The rich heritage and warm hospitality make it a hidden gem worth exploring.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button 
                variant="outline" 
                className="border-2 border-heritage text-heritage bg-white hover:bg-heritage hover:text-white dark:bg-[#000000] dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" 
                asChild
              >
                <a href="https://www.google.com/maps/dir//Paluguntipalli,+Andhra+Pradesh" target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-sm sm:text-base">How to Reach</span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-heritage text-heritage bg-white hover:bg-heritage hover:text-white dark:bg-[#000000] dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" 
                asChild
              >
                <a href="https://www.google.com/maps/place/Peerla+Chavidi/@15.4798849,78.9622919,17z/data=!4m15!1m8!3m7!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!2sPaluguntipalli,+Andhra+Pradesh+523368!3b1!8m2!3d15.4808278!4d78.962409!16s%2Fm%2F051xw63!3m5!1s0x3bb4e16c6f66faed:0xf70656116ddb26a!8m2!3d15.4799415!4d78.9621971!16s%2Fg%2F11px3_fpg_?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-sm sm:text-base">Places to Visit</span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-heritage text-heritage bg-white hover:bg-heritage hover:text-white dark:bg-[#000000] dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" 
                asChild
              >
                <a href="https://calendar.google.com/calendar/u/0/r/month/2024/7/1" target="_blank" rel="noopener noreferrer">
                  <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-sm sm:text-base">Calendar</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 sm:mt-16" data-aos="fade-up" data-aos-duration="1000">
          <div className="rounded-xl overflow-hidden border-4 border-heritage shadow-xl h-[300px] sm:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.727933912945!2d78.532818!3d17.412159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b3f42a7a3f%3A0x17e35614a1b63cd!2sPaluguntipalli%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1650648282284!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="Paluguntipalli Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
