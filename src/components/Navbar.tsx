import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mountain, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { name: 'HOME', id: 'home' },
  { name: 'ABOUT', id: 'about' },
  { name: 'EXPLORE', id: 'explore' },
  { name: 'GALLERY', id: 'gallery' },
  { name: 'CONTACT', id: 'contact' },
];

export const Navbar = ({ 
  activePage, 
  onPageChange,
  user,
  onLogout
}: { 
  activePage: string, 
  onPageChange: (id: string) => void,
  user?: any,
  onLogout?: () => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4",
        isScrolled || activePage !== 'home' ? "bg-bg-dark/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
            <Mountain className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Travel<span className="text-accent">Nepal</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "text-xs font-semibold tracking-[0.2em] transition-all duration-300 relative py-2",
                activePage === item.id ? "text-accent" : "text-white/60 hover:text-white"
              )}
            >
              {item.name}
              {activePage === item.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs group-hover:bg-accent group-hover:text-white transition-all">
                  {user.name[0]}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase group-hover:text-white transition-colors">{user.name}</span>
              </button>
              <button 
                onClick={onLogout}
                className="text-white/40 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavClick('login')}
              className={cn(
                "text-xs font-bold tracking-[0.2em] px-6 py-2 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all",
                activePage === 'login' ? "border-accent text-accent" : "text-white/60"
              )}
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {!user && (
            <button 
              onClick={() => handleNavClick('login')}
              className="text-[10px] font-bold tracking-widest text-accent border border-accent/30 px-4 py-2 rounded-full"
            >
              LOGIN
            </button>
          )}
          <button 
            className="text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-dark/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-sm font-semibold tracking-widest text-left py-2",
                  activePage === item.id ? "text-accent" : "text-white/60"
                )}
              >
                {item.name}
              </button>
            ))}
            <div className="h-px w-full bg-white/5 my-2" />
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-bold text-white/60">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavClick('login')}
                className="text-sm font-bold tracking-widest text-accent text-left py-2"
              >
                LOGIN
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
