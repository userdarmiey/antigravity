"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter-subscribed');
    const closed = sessionStorage.getItem('newsletter-closed');
    
    if (!subscribed && !closed) {
      const timer = setTimeout(() => setIsVisible(true), 15000); // 15 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('newsletter-closed', 'true');
    setIsVisible(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('newsletter-subscribed', 'true');
    setIsVisible(false);
    alert("Welcome to the Archive. Access granted.");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-surface border border-border rounded-[3rem] p-12 shadow-2xl flex flex-col items-center text-center overflow-hidden"
          >
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
             
             <button 
               onClick={handleClose}
               className="absolute top-8 right-8 text-foreground/20 hover:text-foreground transition-colors"
             >
               <X className="w-6 h-6" />
             </button>

             <div className="w-16 h-16 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center mb-8">
                <Mail className="w-8 h-8 text-accent" />
             </div>

             <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-4">Join the Echelon</h2>
             <p className="text-foreground/60 text-sm leading-relaxed mb-10 max-w-xs">
                Subscribe to receive early drops, exclusive archive access, and technical updates from the void.
             </p>

             <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-4">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  className="w-full bg-background border border-border rounded-2xl px-6 py-5 text-sm font-mono text-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <button 
                  type="submit"
                  className="w-full py-5 bg-foreground text-background font-black uppercase text-xs tracking-[0.4em] rounded-2xl hover:bg-accent hover:text-white transition-all shadow-xl shadow-accent/10 active:scale-[0.98]"
                >
                  Synchronize
                </button>
             </form>

             <p className="mt-8 text-[9px] font-bold text-foreground/20 uppercase tracking-widest leading-loose">
               No spam. Only essential data. <br/> Unsubscribe at any time.
             </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
