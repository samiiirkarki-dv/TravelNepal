import React from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';

export const OurPackages = ({ onBook }: { onBook?: (dest: any) => void }) => {
  return (
    <section className="section-padding bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-white/20" />
            <h2 className="text-sm font-bold tracking-[0.4em] text-white/40 uppercase">Our Packages</h2>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h3 className="text-4xl font-bold">POPULAR TOURS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DESTINATIONS.slice(0, 3).map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-4 rounded-[40px] group cursor-pointer border border-white/5 hover:border-accent/30 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] mb-6">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 glass px-4 py-2 rounded-2xl text-[10px] font-bold tracking-widest text-accent border border-white/10">
                  ★ {dest.rating}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-accent font-serif italic text-lg mb-1">{dest.category}</p>
                  <h4 className="text-2xl font-bold tracking-tight text-white mb-4">{dest.name}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">${dest.price}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onBook?.(dest);
                      }}
                      className="bg-accent text-white px-6 py-3 rounded-2xl text-[10px] font-bold tracking-widest hover:bg-white hover:text-accent transition-all duration-300"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
