import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Calendar } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background Video/Image with Immersive Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2000&auto=format&fit=crop"
          alt="Everest Peaks"
          className="w-full h-full object-cover scale-105 brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        {/* Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-10" />
      </div>

      {/* Floating Elements for Atmosphere */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 blur-[80px] md:blur-[120px] rounded-full"
        />
      </div>

      {/* Content Layout - Split Design */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8"
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-px w-8 md:w-12 bg-accent" />
            <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.5em] text-accent uppercase">The Roof of the World</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[140px] font-bold text-white mb-6 md:mb-10 leading-[1] md:leading-[0.85] tracking-tighter">
            SACRED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent/50 italic font-light">PEAKS.</span>
          </h1>
          
          <p className="text-white/50 text-base md:text-xl lg:text-2xl max-w-2xl mb-8 md:mb-12 leading-relaxed font-light">
            Beyond the clouds lies a kingdom of silence and spirit. We curate exclusive expeditions to the most remote corners of the Himalayas.
          </p>

          {/* Search Bar - Premium Travel Feel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-2 rounded-[24px] md:rounded-[32px] border-white/10 flex flex-col md:flex-row items-center gap-2 mb-8 md:mb-12 max-w-3xl"
          >
            <div className="flex-1 flex items-center gap-4 px-4 md:px-6 py-3 md:py-4 border-b md:border-b-0 md:border-r border-white/5 w-full">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45" />
              </div>
              <div className="flex-1">
                <p className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">Destination</p>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="bg-transparent border-none focus:outline-none text-white font-bold placeholder:text-white/20 w-full text-sm md:text-base"
                />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-4 px-4 md:px-6 py-3 md:py-4 border-b md:border-b-0 md:border-r border-white/5 w-full">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">When</p>
                <input 
                  type="text" 
                  placeholder="Select Date" 
                  className="bg-transparent border-none focus:outline-none text-white font-bold placeholder:text-white/20 w-full text-sm md:text-base"
                />
              </div>
            </div>
            <button className="w-full md:w-auto bg-accent text-white px-8 md:px-10 py-4 md:py-5 rounded-[16px] md:rounded-[24px] font-bold text-[10px] md:text-xs tracking-widest hover:bg-white hover:text-accent transition-all duration-500">
              SEARCH
            </button>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white text-bg-dark px-10 md:px-12 py-5 md:py-6 rounded-2xl text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl shadow-white/5"
            >
              EXPLORE EXPEDITIONS
            </motion.button>
            
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-white/60 hover:text-white transition-all group"
            >
              <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em]">VIEW SHOWREEL</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent transition-all">
                <Play className="w-3 h-3 md:w-4 md:h-4 fill-white/60 group-hover:fill-accent group-hover:text-accent ml-1" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Vertical Rail Text */}
        <div className="hidden lg:flex lg:col-span-4 justify-end">
          <div className="flex flex-col items-center gap-12">
            <div className="h-32 w-px bg-gradient-to-b from-transparent via-white/20 to-white/20" />
            <span className="writing-mode-vertical text-[10px] font-bold tracking-[0.8em] text-white/20 uppercase rotate-180">
              ESTABLISHED 2014 — NEPAL
            </span>
            <div className="h-32 w-px bg-gradient-to-t from-transparent via-white/20 to-white/20" />
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 w-full z-30 border-t border-white/5 bg-bg-dark/40 backdrop-blur-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'PEAKS CONQUERED', value: '14+' },
            { label: 'HAPPY EXPLORERS', value: '2.4K' },
            { label: 'EXPERT GUIDES', value: '42' },
            { label: 'SAFETY RATING', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[7px] md:text-[8px] font-bold tracking-widest text-white/30 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
