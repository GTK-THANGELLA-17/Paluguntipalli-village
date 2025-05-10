
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image, Video } from "lucide-react";

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
}

// Sample gallery data - replace with your actual images
const villageGallery: GalleryItem[] = [
  { type: 'image', src: "/BUS STAND.jpg", alt: "Village Image 1" },
  { type: 'image', src: "/BUS STAND ROAD.jpg", alt: "Village Image 1" },
  { type: 'image', src: "/Hanuman Statue.jpg", alt: "Water surrounded by trees" },
  { type: 'image', src: "/VILLAGE START.jpg", alt: "Water surrounded by trees" },
  { type: 'image', src: "/Temple .jpg", alt: "Village Image 1" },
  { type: 'image', src: "/School.jpg", alt: "Village Image 2" },
  { type: 'image', src: "/Peerla chavidi 1.jpg", alt: "Village Image 3" },
  { type: 'image', src: "/Kasinayana Temple.jpg", alt: "River View" },
  

];

const festivalGallery: GalleryItem[] = [
  { type: 'image', src: "/gundam.jpg", alt: "Gundam" },
  { type: 'image', src: "/peerla chavidi.jpg", alt: "Peerla Chavidi" },
  { type: 'image', src: "/peerlu 1.jpg", alt: "Peerlu 1" },
  { type: 'image', src: "/Thangella Swamy And Brother.jpg", alt: "Thangella Swamy And Brother" },
  { type: 'image', src: "/pedda sarigesu 2.jpg", alt: "Pedda Sarigesu 2" },
  { type: 'image', src: "/pedda sarigesu 1.jpg", alt: "Pedda Sarigesu 1" },
  { type: 'image', src: "/Thangella Swamy.jpg", alt: "Thangella Swamy" }
];

const festivalVideos: GalleryItem[] = [
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

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  return (
    <section id="gallery" className="py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-[#000000] dark:text-white" data-aos="fade-up">Gallery</h2>
        
        <Tabs defaultValue="village" className="w-full" data-aos="fade-up" data-aos-delay="100">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-gray-100 dark:bg-[#333333]">
            <TabsTrigger value="village" className="text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white">
              <Image size={18} className="mr-2 hidden md:inline" />
              Village Gallery
            </TabsTrigger>
            <TabsTrigger value="festival" className="text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white">
              <Image size={18} className="mr-2 hidden md:inline" />
              Festival Gallery
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white">
              <Video size={18} className="mr-2 hidden md:inline" />
              Festival Videos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="village" id="village-gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {villageGallery.map((item, index) => (
                <div 
                  key={index}
                  className="gallery-item group cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={100 * index}
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="aspect-[4/3] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Image size={24} className="mx-auto" />
                      <p className="font-medium mt-2">{item.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="festival">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {festivalGallery.map((item, index) => (
                <div 
                  key={index}
                  className="gallery-item group cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={100 * index}
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="aspect-[4/3] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Image size={24} className="mx-auto" />
                      <p className="font-medium mt-2">{item.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {festivalVideos.map((item, index) => (
                <div 
                  key={index}
                  className="gallery-item group cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={100 * index}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                    <img 
                      src={item.thumbnail} 
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-heritage bg-opacity-80 text-white">
                        <Video size={32} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <p className="font-medium mt-2">{item.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Media Viewer Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl p-0 bg-white dark:bg-[#2a2a2a] overflow-hidden">
            <DialogHeader className="p-6">
              <DialogTitle className="text-[#000000] dark:text-white">{selectedItem?.alt}</DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-300">
                Paluguntipalli Heritage Collection
              </DialogDescription>
            </DialogHeader>
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedItem?.type === 'image' ? (
                <img 
                  src={selectedItem.src} 
                  alt={selectedItem.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : selectedItem?.type === 'video' ? (
                <video 
                  src={selectedItem.src} 
                  controls
                  autoPlay
                  className="w-full max-h-[70vh]"
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
