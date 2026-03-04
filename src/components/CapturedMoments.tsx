import React from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const CapturedMoments = () => {
  return (
    <section className="section-padding bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-accent font-serif italic text-2xl mb-2">Our</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">MOVEMENTS</h3>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 group relative rounded-[40px] md:rounded-[60px] overflow-hidden cursor-pointer border border-white/5 aspect-[4/3] md:aspect-auto"
          >
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop" 
              alt="Pokhara Valley" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <div className="flex items-center gap-4 mb-2 md:mb-4">
                <div className="h-px w-6 md:w-8 bg-accent" />
                <p className="text-accent font-serif italic text-xl md:text-2xl">Adventure</p>
              </div>
              <h4 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">PHEWA LAKE <br /> EXPEDITION</h4>
            </div>
          </motion.div>

          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-[40px] md:rounded-[60px] overflow-hidden cursor-pointer border border-white/5 aspect-[4/3] md:aspect-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1529927066849-79b791a69825?q=80&w=1200&auto=format&fit=crop" 
                alt="Chitwan Wildlife" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
                <p className="text-accent font-serif italic text-base md:text-lg mb-1">Jungle</p>
                <h4 className="text-2xl md:text-3xl font-bold text-white">CHITWAN WILDLIFE</h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-[40px] md:rounded-[60px] overflow-hidden cursor-pointer border border-white/5 aspect-[4/3] md:aspect-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1200&auto=format&fit=crop" 
                alt="Everest Peaks" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
                <p className="text-accent font-serif italic text-base md:text-lg mb-1">Mountains</p>
                <h4 className="text-2xl md:text-3xl font-bold text-white">EVEREST SUMMIT</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
