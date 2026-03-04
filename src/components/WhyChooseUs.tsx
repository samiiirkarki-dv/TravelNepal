import React from 'react';
import { motion } from 'motion/react';
import { Shield, Map, Compass, Heart } from 'lucide-react';

const FEATURES = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    desc: 'We prioritize your safety with certified guides and secure payment systems.'
  },
  {
    icon: Map,
    title: 'Local Expertise',
    desc: 'Our local guides know the hidden gems that you won\'t find in any guidebook.'
  },
  {
    icon: Compass,
    title: 'Tailored Trips',
    desc: 'We customize every itinerary to match your pace, interests, and budget.'
  },
  {
    icon: Heart,
    title: 'Eco-Friendly',
    desc: 'We are committed to sustainable tourism that respects local communities.'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-accent blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-accent" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-accent uppercase">The TravelNepal Advantage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-10">
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent/50 italic font-light">MEMORIES.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12 max-w-xl">
              We don't just organize trips; we create life-changing experiences. Our commitment to excellence ensures every detail is handled with precision.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {FEATURES.map((feature, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent transition-all duration-500">
                    <feature.icon className="w-6 h-6 text-accent group-hover:text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                  <p className="text-white/30 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[60px] overflow-hidden group"
          >
            <img 
              src="https://images.unsplash.com/photo-1582650859079-ee6391318a45?q=80&w=1200&auto=format&fit=crop" 
              alt="Nepal Experience" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 glass p-8 rounded-[40px] border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-dark bg-accent/20 flex items-center justify-center text-[10px] font-bold">
                      U{i}
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-white/60">2.4K+ Happy Explorers</p>
              </div>
              <p className="text-lg font-bold italic">"The most authentic experience I've ever had in the Himalayas."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
