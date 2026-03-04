import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight, Mountain, X } from 'lucide-react';

export const UserLogin = ({ onLogin, onClose }: { onLogin: (name: string, pass: string) => void, onClose?: () => void }) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !pass) {
      setError('Please fill in all fields');
      return;
    }
    if (pass.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    onLogin(name, pass);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-dark/90 backdrop-blur-md overflow-y-auto">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative glass p-10 md:p-16 rounded-[40px] w-full max-w-lg border-white/10 shadow-2xl my-auto"
      >
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 shadow-lg shadow-accent/20">
            <Mountain className="text-accent w-10 h-10 -rotate-12" />
          </div>
          <h2 className="text-4xl font-bold mb-3 tracking-tight">{isLogin ? 'Welcome Back' : 'Join the Journey'}</h2>
          <p className="text-white/40 text-sm tracking-widest uppercase">{isLogin ? 'Login to your travel account' : 'Create your Nepal adventure account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500 text-xs font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-4">Full Name</label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-accent/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-4">Password</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
              <input 
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-accent/50 transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="btn-primary w-full justify-center py-5 mt-4 text-sm tracking-[0.2em] font-bold shadow-lg shadow-accent/20"
          >
            {isLogin ? 'LOGIN NOW' : 'SIGN UP NOW'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/40 hover:text-accent text-xs font-bold tracking-widest transition-colors"
          >
            {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOGIN"}
          </button>
        </div>

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] tracking-widest uppercase mb-4">Or continue with</p>
          <div className="flex justify-center gap-4">
            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-accent/30 transition-all group">
              <span className="font-bold text-lg group-hover:text-accent transition-colors">G</span>
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-accent/30 transition-all group">
              <span className="font-bold text-lg group-hover:text-accent transition-colors">f</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
