"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const activities = [
  "Someone in Lagos just bought a Hoodie 🚀",
  "New Order: 2x White Shirts going to Abuja 📦",
  "Selling Fast: Only 3 Beige Hoodies left! 🔥",
  "Payment ok for Order #GSR-2831 💸",
  "Live: 42 people are looking at the shop ✨",
  "New clothes are now available ⚡",
  "Someone just checked their order from Port Harcourt 🛰️",
];

export default function LiveActivity() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const showToast = () => {
      setIndex(Math.floor(Math.random() * activities.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    // Show first toast after 3 seconds
    const initialTimeout = setTimeout(showToast, 3000);
    
    // Repeat every 12-20 seconds
    const interval = setInterval(showToast, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[100] pointer-events-none hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="bg-surface/80 backdrop-blur-2xl border border-white/10 p-4 pl-5 pr-8 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-xl">
              {activities[index].includes('🔥') || activities[index].includes('🚀') ? '🔥' : '✨'}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-0.5">Live Alert</span>
              <span className="text-xs font-bold text-foreground/80 tracking-tight">{activities[index]}</span>
            </div>
            
            {/* Subtle progress bar */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-accent/30 w-full overflow-hidden rounded-b-2xl">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-accent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
