import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { cn } from '../lib/utils';

const CATEGORIES = ['ALL', 'MOUNTAINS', 'JUNGLE', 'CULTURE', 'SPIRITUAL', 'ADVENTURE'];

export const Explore = ({ onBook }: { onBook?: (dest: any) => void }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesCategory = activeCategory === 'ALL' || dest.category.toUpperCase() === activeCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="explore" className="section-padding bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-accent font-serif italic text-3xl mb-4">Discover Destinations</h2>
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search Destination..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300",
                  activeCategory === cat ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-accent">
                    {dest.category.toUpperCase()}
                  </div>
                  <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white flex items-center gap-1">
                    ★ {dest.rating}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-accent">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-widest">NEPAL</span>
                    </div>
                    <span className="text-xl font-bold text-accent">${dest.price}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{dest.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="text-white font-bold text-xs tracking-[0.2em] flex items-center gap-2 group/btn">
                      DETAILS 
                      <div className="w-8 h-px bg-white/20 group-hover/btn:w-12 group-hover/btn:bg-accent transition-all duration-300" />
                    </button>
                    <button 
                      onClick={() => onBook?.(dest)}
                      className="bg-accent/10 hover:bg-accent text-accent hover:text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
