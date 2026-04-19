"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:w-[400px] z-[2000]"
        >
          <div className="bg-surface/80 backdrop-blur-3xl border border-border p-6 rounded-[2rem] shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">We Use Cookies</h4>
            </div>
            <p className="text-foreground/60 text-xs leading-relaxed tracking-wide">
              We use cookies to make your shopping experience better and to show you things you'll like. 
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleAccept}
                className="flex-1 py-3 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-accent hover:text-white transition-all shadow-xl active:scale-95"
              >
                That's Fine
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 py-3 border border-border text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:text-foreground transition-all"
              >
                No Thanks
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
