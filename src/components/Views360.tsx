import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const villageImages = [
  { type: 'image', src: "/Temple .jpg", alt: "Village Image 1" },
  { type: 'image', src: "/School.jpg", alt: "Village Image 2" },
  { type: 'image', src: "/Peerla chavidi 1.jpg", alt: "Village Image 3" },
  { type: 'image', src: "/Kasinayana Temple.jpg", alt: "River View" },
  { type: 'image', src: "/Hanuman Statue.jpg", alt: "Water surrounded by trees" }
];

const Views360 = () => {
  const scrollToVillageGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      const tabsTrigger = document.querySelector('[data-value="village"]') as HTMLElement;
      if (tabsTrigger) {
        tabsTrigger.click(); // Activate the village gallery tab
      }
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="views360" className="py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-[#000000] dark:text-white" data-aos="fade-up">
          360° Views Of Village
        </h2>

        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up" data-aos-delay="100">
          <p className="text-lg mb-8 text-[#000000] dark:text-white">
            Explore immersive 360° views of Paluguntipalli's streets and landmarks. Take a virtual tour
            to experience the village's beauty from every angle.
          </p>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-heritage mb-8">
            <div className="aspect-[16/9] bg-gray-200 relative">
              <img 
                src="/Hanuman Statue.jpg" 
                alt="Village 360 View Preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="text-white text-center">
                  <div className="w-24 h-24 border-4 border-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-3xl font-bold">360°</div>
                  </div>
                  <p className="text-xl font-medium">Click to explore in Google Maps</p>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4798863,78.9623224,3a,75y,312.42h,102.3t/data=!3m8!1e1!3m6!1sAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z%3Dw203-h100-k-no-pi-0-ya50.731716-ro-0-fo100!7i8704!8i4352!4m9!3m8!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!8m2!3d15.4808278!4d78.962409!10e5!14m1!1BCgIgARICCAI!16s%2Fm%2F051xw63"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              ></a>
            </div>
          </div>

          <div className="space-x-4">
            <Button asChild className="hero-button">
              <a 
                href="https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4798863,78.9623224,3a,75y,312.42h,102.3t/data=!3m8!1e1!3m6!1sAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z%3Dw203-h100-k-no-pi-0-ya50.731716-ro-0-fo100!7i8704!8i4352!4m9!3m8!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!8m2!3d15.4808278!4d78.962409!10e5!14m1!1BCgIgARICCAI!16s%2Fm%2F051xw63"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={18} className="mr-2" />
                Explore 360° View
              </a>
            </Button>

            <Button 
              className="hero-button bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800"
              onClick={scrollToVillageGallery}
            >
              <MapPin size={18} className="mr-2" />
              View Village Gallery
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {villageImages.map((img, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden shadow-md border-2 border-heritage hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-heritage text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  360°
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Views360;
