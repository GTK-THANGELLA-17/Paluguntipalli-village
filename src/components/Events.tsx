import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

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
    thumbnail: "pedda sarigesu 1.jpg"
  },
  { 
    type: 'video', 
    src: "/pedda sarigesu 3.mp4",
    alt: "Festival Video 2",
    thumbnail: "pedda sarigesu image 4.jpg"
  },
  { 
    type: 'video', 
    src: "/pedda sarigesu 2.mp4",
    alt: "Festival Video 3",
    thumbnail: "pedda sarigesu 2.jpg"
  }
];

const Events = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system's dark/light mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
  }, []);

  return (
    <section id="main-events" className={`py-20 ${isDarkMode ? 'bg-charcoal' : 'bg-heritage-bg'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`section-title ${isDarkMode ? 'text-pearl' : ''}`} data-aos="fade-up">
          Main Events
        </h2>
        
        <div className={`bg-${isDarkMode ? 'charcoal' : 'white'} rounded-xl shadow-xl p-8 mb-12`} data-aos="fade-up">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className={`aspect-square rounded-xl overflow-hidden shadow-lg border-4 ${isDarkMode ? 'border-pearl' : 'border-heritage'}`}>
                <img 
                  src="/Thangella Swamy.jpg" 
                  alt="Peerla Panguda"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className={`text-3xl font-bold mb-4 font-playfair ${isDarkMode ? 'text-pearl' : 'text-village-primary'}`}>
                Peerla Panguda
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-pearl' : ''}`}>
                <strong>Peerla Panguda</strong> is the main event celebrated during every
                Moharam. Experience vibrant processions, religious rituals, and cultural
                performances that unite the community.
              </p>
              <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-pearl' : ''}`}>
                This festival showcases the rich cultural heritage of Paluguntipalli and brings together 
                people from all walks of life. The festivities include traditional music, dance performances,
                and a grand procession through the village.
              </p>
              <Button className={`hero-button ${isDarkMode ? 'bg-black text-white' : ''}`}>
                <Calendar size={18} className="mr-2" />
                Next Event: July 2024
              </Button>
            </div>
          </div>
        </div>
        
        <h3 className={`text-2xl font-bold mb-8 text-center font-playfair ${isDarkMode ? 'text-pearl' : ''}`} data-aos="fade-up">
          Peerla Panguda Images
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {eventImages.slice(0, showAllImages ? eventImages.length : 3).map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={100 * index}
            >
              <img 
                src={image} 
                alt={`Peerla Panguda Image ${index + 1}`} 
                className="aspect-[4/3] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => setShowAllImages(!showAllImages)}
            className={`btn-outline ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {showAllImages ? (
              <>
                <ChevronUp size={18} className="mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={18} className="mr-2" />
                Show More
              </>
            )}
          </Button>
        </div>
        
        <h3 className={`text-2xl font-bold mt-16 mb-8 text-center font-playfair ${isDarkMode ? 'text-pearl' : ''}`} data-aos="fade-up">
          Peerla Panguda Videos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivalVideos.map((video, index) => (
            <div key={index} className="gallery-item" data-aos="zoom-in">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                {/* Thumbnail image before video is loaded */}
                <img 
                  src={video.thumbnail} 
                  alt={video.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-heritage bg-opacity-80 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
                {/* Video Element */}
                <video 
                  className="w-full h-full absolute inset-0 object-cover" 
                  controls
                  poster={video.thumbnail}
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
