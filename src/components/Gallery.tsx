
import { useState } from 'react';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import GalleryTabs from './gallery/GalleryTabs';
import GalleryGrid from './gallery/GalleryGrid';
import MediaViewer from './gallery/MediaViewer';
import { galleryData } from './gallery/galleryData';

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { t } = useTranslation();
  
  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-[#000000] dark:text-white" 
          data-aos="fade-up"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('Gallery', 'Gallery')}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <GalleryTabs 
            galleryData={galleryData}
            onItemSelect={setSelectedItem}
          />
        </motion.div>

        <MediaViewer 
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </section>
  );
};

export default Gallery;
