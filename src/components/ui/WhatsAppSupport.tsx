"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppSupport() {
  const whatsappNumber = "2348000000000"; // Placeholder
  const message = "Hi Fit and Fab! I need help with an order.";

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-32 right-8 z-[2500] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-all md:bottom-12"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute -top-12 right-0 bg-surface border border-border px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Talk to Us
      </span>
    </motion.button>
  );
}
