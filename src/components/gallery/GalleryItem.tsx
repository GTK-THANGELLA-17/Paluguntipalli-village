
import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";
import OptimizedImage from "../OptimizedImage";

interface GalleryItemProps {
  item: any;
  index: number;
  onSelect: (item: any) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onSelect }) => {
  return (
    <motion.div 
      className="gallery-item group cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
      data-aos="zoom-in"
      data-aos-delay={100 * index}
      onClick={() => onSelect(item)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-xl">
        {item.type === 'video' ? (
          <div className="relative w-full h-full">
            <OptimizedImage
              src={item.thumbnail || item.src}
              alt={item.alt}
              className="w-full h-full"
              loading="lazy"
            />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-heritage/80 backdrop-blur-sm text-white border-2 border-white/30">
                <Video size={24} className="sm:w-8 sm:h-8" />
              </div>
            </motion.div>
          </div>
        ) : (
          <OptimizedImage
            src={item.src}
            alt={item.alt}
            className="w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        )}
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="text-white p-4 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {item.type === 'image' ? <Image size={20} className="mx-auto mb-2 sm:w-6 sm:h-6" /> : <Video size={20} className="mx-auto mb-2 sm:w-6 sm:h-6" />}
          <p className="font-medium text-sm sm:text-base">{item.alt}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryItem;
