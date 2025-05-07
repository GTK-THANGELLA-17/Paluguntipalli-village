import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const carouselImages = [
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
  {
    src: "/Hanuman Statue.jpg",
    alt: "Water surrounded by trees"
  }
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-heritage-bg dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Carousel */}
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl h-[500px] border-4 border-heritage"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Carousel indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-heritage" : "bg-white/70"
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* About Text */}
          <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <h2 className="section-title text-[#403E43] dark:text-white">About Our Village</h2>
            <p className="text-lg leading-relaxed mb-6 text-[#403E43] dark:text-white">
              Paluguntipalli is a picturesque village located in Andhra Pradesh, known for its serene environment and vibrant culture. Surrounded by lush greenery, it offers a tranquil escape from the hustle and bustle of city life.
            </p>
            <p className="text-lg leading-relaxed mb-8 text-[#403E43] dark:text-white">
              The village is home to several historic temples and traditional festivals celebrated with great enthusiasm by the locals. The rich heritage and warm hospitality make it a hidden gem worth exploring.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {/* How to Reach Button */}
              <Button
                variant="outline"
                className="bg-black text-white border-black"
                asChild
              >
                <a
                  href="https://www.google.com/maps/dir//Paluguntipalli,+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={18} />
                  How to Reach
                </a>
              </Button>

              {/* Places to Visit Button */}
              <Button
                variant="outline"
                className="bg-black text-white border-black"
                asChild
              >
                <a
                  href="https://www.google.com/maps/place/Peerla+Chavidi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={18} />
                  Places to Visit
                </a>
              </Button>

              {/* Calendar Button */}
              <Button
                variant="outline"
                className="bg-black text-white border-black"
                asChild
              >
                <a
                  href="https://calendar.google.com/calendar/u/0/r/month/2024/7/1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar size={18} />
                  Calendar
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16" data-aos="fade-up" data-aos-duration="1000">
          <div className="rounded-xl overflow-hidden border-4 border-heritage shadow-xl h-[400px]">
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
