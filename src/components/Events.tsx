import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

const eventImages = [
  "/gundam.jpg",
  "/peerla chavidi.jpg",
  "/peerlu 1.jpg",
  "/Thangella Swamy And Brother.jpg",
  "/pedda sarigesu 2.jpg",
  "/pedda sarigesu 1.jpg",
  "/Thangella Swamy.jpg"
];

const festivalVideos = [
  { 
    type: 'video', 
    src: "/pedda sarigesu 1.mp4",
    alt: "Festival Video 1",
    thumbnail: "/pedda sarigesu 1.jpg"
  },
  { 
    type: 'video', 
    src: "/pedda sarigesu 3.mp4",
    alt: "Festival Video 2",
    thumbnail: "/pedda sarigesu image 4.jpg"
  },
  { 
    type: 'video', 
    src: "/pedda sarigesu 2.mp4",
    alt: "Festival Video 3",
    thumbnail: "/pedda sarigesu 2.jpg"
  }
];

const Events = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
  };

  const visibleImages = showAllImages ? eventImages : eventImages.slice(0, 3);

  return (
    <section id="main-events" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-[#000000] dark:text-white" data-aos="fade-up">Main Events</h2>
        
        <div className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center">
            <div className="w-full lg:w-1/3">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-heritage dark:border-white">
                <OptimizedImage
                  src={eventImages[currentImageIndex]}
                  alt="Peerla Panguda"
                  className="w-full h-full"
                  priority={true}
                  showNavigationArrows={true}
                  onPrevious={prevImage}
                  onNext={nextImage}
                />
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-playfair text-[#000000] dark:text-white">Peerla Panguda</h3>
              <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-[#000000] dark:text-white">
                <strong>Peerla Panguda</strong> is the main event celebrated during every
                Moharam. Experience vibrant processions, religious rituals, and cultural
                performances that unite the community.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-[#000000] dark:text-white">
                This festival showcases the rich cultural heritage of Paluguntipalli and brings together 
                people from all walks of life. The festivities include traditional music, dance performances,
                and a grand procession through the village.
              </p>
              <Button className="bg-[#000000] hover:bg-[#333333] text-white dark:bg-[#000000] dark:hover:bg-[#333333] dark:text-white transition-all duration-300">
                <Calendar size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Next Event: July 2024</span>
              </Button>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center font-playfair text-[#000000] dark:text-white" data-aos="fade-up">
          Peerla Panguda Images
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item relative group"
              data-aos="zoom-in"
              data-aos-delay={100 * index}
            >
              <OptimizedImage
                src={image}
                alt={`Peerla Panguda Image ${index + 1}`}
                aspectRatio="aspect-[4/3]"
                className="rounded-lg w-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8">
          <Button 
            variant="outline" 
            onClick={() => setShowAllImages(!showAllImages)}
            className="border-2 bg-[#000000] text-white hover:bg-[#333333] dark:bg-[#000000] dark:text-white dark:border-white dark:hover:bg-[#333333] transition-all duration-300"
          >
            {showAllImages ? (
              <>
                <ChevronUp size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Show More</span>
              </>
            )}
          </Button>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mt-12 sm:mt-16 mb-6 sm:mb-8 text-center font-playfair text-[#000000] dark:text-white" data-aos="fade-up">
          Peerla Panguda Videos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {festivalVideos.map((video, index) => (
            <div key={index} className="gallery-item relative group" data-aos="zoom-in">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <video
                  controls
                  poster={video.thumbnail}
                  className="w-full h-full rounded-lg"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
