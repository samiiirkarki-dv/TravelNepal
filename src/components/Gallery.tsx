import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../constants';
import { cn } from '../lib/utils';
import { Share2, Facebook, Twitter, MessageCircle, X, Download } from 'lucide-react';

const CATEGORIES = ['ALL', 'NATURE', 'PEOPLE', 'CITIES', 'ADVENTURE'];

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = GALLERY_IMAGES.filter(img => 
    activeCategory === 'ALL' || img.category.toUpperCase() === activeCategory
  );

  const shareOnSocial = (platform: string, imageUrl: string) => {
    const text = "Check out this amazing view from Nepal! #TravelNepal";
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
        break;
    }

    if (shareUrl) window.open(shareUrl, '_blank');
  };

  return (
    <section id="gallery" className="section-padding bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">OUR TRAVEL GALLERY</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12" />
          
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300",
                  activeCategory === cat ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group rounded-3xl overflow-hidden cursor-pointer break-inside-avoid"
              >
                <img 
                  src={img.url} 
                  alt="Gallery" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                  <div className="glass p-3 rounded-full">
                    <span className="text-xs font-bold tracking-widest">{img.category}</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedImage(img.url)}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative glass p-8 rounded-[40px] w-full max-w-lg"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-8">
                <h3 className="text-2xl font-bold">Share this Moment</h3>
                <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => shareOnSocial('facebook', selectedImage)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#1877F2] transition-colors">
                      <Facebook className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/40 group-hover:text-white">FACEBOOK</span>
                  </button>
                  <button 
                    onClick={() => shareOnSocial('twitter', selectedImage)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#1DA1F2] transition-colors">
                      <Twitter className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/40 group-hover:text-white">TWITTER</span>
                  </button>
                  <button 
                    onClick={() => shareOnSocial('whatsapp', selectedImage)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/40 group-hover:text-white">WHATSAPP</span>
                  </button>
                </div>

                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = selectedImage;
                    link.download = 'travel-nepal.jpg';
                    link.click();
                  }}
                  className="btn-primary w-full justify-center py-4"
                >
                  <Download className="w-4 h-4" /> DOWNLOAD IMAGE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
