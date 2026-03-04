import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Quote, CheckCircle2, Users, MapPin, Calendar } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const SUCCESS_DATA = [
  { year: '2020', tours: 45, satisfaction: 92 },
  { year: '2021', tours: 62, satisfaction: 94 },
  { year: '2022', tours: 88, satisfaction: 96 },
  { year: '2023', tours: 124, satisfaction: 98 },
  { year: '2024', tours: 156, satisfaction: 99 },
];

const RECENT_STORIES = [
  { id: 1, name: 'The Everest Expedition', client: 'James Wilson', date: 'Oct 2023', status: 'Completed', rating: 5 },
  { id: 2, name: 'Annapurna Circuit', client: 'Sarah Chen', date: 'Nov 2023', status: 'Completed', rating: 5 },
  { id: 3, name: 'Chitwan Safari', client: 'Marc Rossi', date: 'Dec 2023', status: 'Completed', rating: 4 },
  { id: 4, name: 'Lumbini Spiritual Tour', client: 'Elena Gilbert', date: 'Jan 2024', status: 'Completed', rating: 5 },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Solo Traveler, UK',
    text: 'The Everest Base Camp trek was a dream come true. TravelNepal made every step seamless and safe. Their local knowledge is unmatched!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Photographer, Singapore',
    text: 'I captured the most stunning landscapes of my career. The guides knew exactly where to be for the best light. Highly recommend for any creative!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Emma & Marc',
    role: 'Honeymooners, France',
    text: 'Our luxury stay in Pokhara was magical. From the sunrise views to the private boat rides, everything was perfectly curated for us.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  }
];

export const About = () => {
  const stats = [
    { label: 'YEARS', value: '12+', icon: Calendar },
    { label: 'HAPPY CLIENTS', value: '1.2K+', icon: Users },
    { label: 'TOURS', value: '250+', icon: MapPin },
  ];

  return (
    <section id="about" className="bg-bg-dark relative overflow-hidden">
      {/* Hero Section of About */}
      <div className="section-padding relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-4">OUR MISSION</h2>
            <p className="text-accent font-serif italic text-2xl mb-8">PRESERVING HERITAGE, CREATING ADVENTURE</p>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-accent" />
                    <h4 className="text-4xl font-bold text-white">{stat.value}</h4>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] text-white/40 font-bold group-hover:text-accent transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-widest flex items-center gap-3">
                <span className="w-12 h-[1px] bg-accent" /> THE TRAVELNEPAL WAY
              </h3>
              <p className="text-white/60 leading-relaxed max-w-xl">
                Founded in the heart of Kathmandu, TravelNepal is more than a travel agency. We are a collective of explorers, historians, and environmentalists dedicated to showcasing the true spirit of Nepal. Our mission is to provide sustainable, high-impact travel experiences that benefit both our guests and the local communities we serve.
              </p>
              <p className="text-white/60 leading-relaxed max-w-xl">
                From the highest peaks of the Himalayas to the deepest jungles of the Terai, we provide unparalleled access to the most remote and beautiful corners of our country.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px]">
              <div className="aspect-square rounded-full border border-white/10 absolute -inset-6 md:-inset-10 animate-spin-slow pointer-events-none" />
              <div className="aspect-square rounded-full border border-accent/20 absolute -inset-12 md:-inset-20 animate-spin-reverse-slow pointer-events-none opacity-50" />
              
              <div className="relative z-10 rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl shadow-black/50 border border-white/5 group">
                <img 
                  src="https://images.unsplash.com/photo-1582650859079-ee6391318a45?q=80&w=1600&auto=format&fit=crop" 
                  alt="Nepal Culture" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-8 right-8 glass p-4 rounded-2xl border-white/10 backdrop-blur-md">
                  <p className="text-accent font-bold text-2xl">12Y</p>
                  <p className="text-[8px] tracking-widest text-white/40 font-bold uppercase">Experience</p>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 glass p-6 md:p-8 rounded-3xl max-w-[200px] md:max-w-[240px] z-20 border-accent/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                  </div>
                  <p className="text-accent font-serif italic text-base md:text-lg">Local Experts</p>
                </div>
                <p className="text-[10px] md:text-xs text-white/60 leading-relaxed">Our team consists of 100% local experts who live and breathe the Nepalese way of life.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Successful Stories Section */}
      <div className="section-padding bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-accent font-serif italic text-2xl mb-2">Our Success</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">SUCCESSFUL STORIES</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Growth Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[40px] h-[450px]"
            >
              <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" /> Annual Tour Growth
              </h4>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={SUCCESS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="year" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '16px' }}
                  />
                  <Bar dataKey="tours" radius={[10, 10, 0, 0]}>
                    {SUCCESS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === SUCCESS_DATA.length - 1 ? '#F27D26' : '#F27D2640'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Success Table */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-[40px]"
            >
              <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" /> Recent Achievements
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 text-[10px] tracking-widest text-white/40 uppercase">Story</th>
                      <th className="pb-4 text-[10px] tracking-widest text-white/40 uppercase">Client</th>
                      <th className="pb-4 text-[10px] tracking-widest text-white/40 uppercase">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {RECENT_STORIES.map((story) => (
                      <tr key={story.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4">
                          <p className="font-bold text-sm">{story.name}</p>
                          <p className="text-[10px] text-white/40">{story.date}</p>
                        </td>
                        <td className="py-4 text-sm text-white/60">{story.client}</td>
                        <td className="py-4">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < story.rating ? 'text-accent fill-accent' : 'text-white/10'}`} />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="w-full mt-8 py-4 border border-white/10 rounded-2xl text-xs font-bold tracking-widest hover:bg-white/5 transition-all">
                VIEW ALL SUCCESS STORIES
              </button>
            </motion.div>
          </div>

          {/* Testimonial Slider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl relative group hover:border-accent/30 transition-all duration-500"
              >
                <Quote className="absolute top-6 right-8 w-10 h-10 text-accent/10 group-hover:text-accent/20 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, star) => (
                    <Star key={star} className="w-3 h-3 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-white/60 italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

