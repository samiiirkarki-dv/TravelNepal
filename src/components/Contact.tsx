import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const Contact = ({ onSendMessage }: { onSendMessage?: (msg: any) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  if (!isLoaded) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      onSendMessage?.({
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1526716173434-a2b5ad15368a?q=80&w=2000&auto=format&fit=crop" 
          alt="Contact Background" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/10 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-12">GET IN TOUCH</h2>
          
          <div className="space-y-10">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Mail className="w-6 h-6 text-accent group-hover:text-white" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-1">EMAIL US</p>
                <p className="text-xl font-medium">travelnepal@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Phone className="w-6 h-6 text-accent group-hover:text-white" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-1">CALL US</p>
                <p className="text-xl font-medium">+977-9801234567</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <MapPin className="w-6 h-6 text-accent group-hover:text-white" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold tracking-widest mb-1">VISIT US</p>
                <p className="text-xl font-medium">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-16">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group">
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[40px]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-white/40">YOUR NAME</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/50 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-white/40">YOUR EMAIL</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/50 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-white/40">MESSAGE</label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/50 transition-all resize-none"
                placeholder="Tell us about your dream trip..."
                required
              />
            </div>

            <button 
              type="submit"
              className={cn(
                "btn-primary w-full justify-center py-5 text-sm tracking-[0.2em] font-bold",
                isSent && "bg-green-500 hover:bg-green-600"
              )}
            >
              {isSent ? "MESSAGE SENT!" : "SEND MESSAGE"} <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
