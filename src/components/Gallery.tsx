
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
import OptimizedImage from "./OptimizedImage";

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
  
  const renderGalleryItem = (item: GalleryItem, index: number) => {
    return (
      <div 
        key={index}
        className="gallery-item group cursor-pointer relative"
        data-aos="zoom-in"
        data-aos-delay={100 * index}
        onClick={() => setSelectedItem(item)}
      >
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          {item.type === 'video' ? (
            <>
              <OptimizedImage
                src={item.thumbnail || item.src}
                alt={item.alt}
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-heritage bg-opacity-80 text-white">
                  <Video size={24} className="sm:w-8 sm:h-8" />
                </div>
              </div>
            </>
          ) : (
            <OptimizedImage
              src={item.src}
              alt={item.alt}
              className="w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center rounded-lg">
          <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center px-4">
            {item.type === 'image' ? <Image size={20} className="mx-auto mb-2 sm:w-6 sm:h-6" /> : <Video size={20} className="mx-auto mb-2 sm:w-6 sm:h-6" />}
            <p className="font-medium text-sm sm:text-base">{item.alt}</p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-[#000000] dark:text-white" data-aos="fade-up">Gallery</h2>
        
        <Tabs defaultValue="village" className="w-full" data-aos="fade-up" data-aos-delay="100">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 sm:mb-12 bg-gray-100 dark:bg-[#333333] h-auto">
            <TabsTrigger value="village" className="text-xs sm:text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white py-2 sm:py-3">
              <Image size={16} className="mr-1 sm:mr-2 hidden sm:inline w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="truncate">Village Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="festival" className="text-xs sm:text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white py-2 sm:py-3">
              <Image size={16} className="mr-1 sm:mr-2 hidden sm:inline w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="truncate">Festival Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs sm:text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white py-2 sm:py-3">
              <Video size={16} className="mr-1 sm:mr-2 hidden sm:inline w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="truncate">Festival Videos</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="village" id="village-gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {villageGallery.map((item, index) => renderGalleryItem(item, index))}
            </div>
          </TabsContent>
          
          <TabsContent value="festival">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {festivalGallery.map((item, index) => renderGalleryItem(item, index))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {festivalVideos.map((item, index) => renderGalleryItem(item, index))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Media Viewer Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl p-0 bg-white dark:bg-[#2a2a2a] overflow-hidden">
            <DialogHeader className="p-4 sm:p-6">
              <DialogTitle className="text-[#000000] dark:text-white text-lg sm:text-xl">{selectedItem?.alt}</DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
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
