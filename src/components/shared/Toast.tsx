"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const Toast = () => {
  const { notification, hideNotification } = useStore();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-6"
        >
          <div className={`
            relative overflow-hidden
            bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl
            flex items-center gap-4
          `}>
             {/* Progress Bar */}
             <motion.div 
               initial={{ scaleX: 1 }}
               animate={{ scaleX: 0 }}
               transition={{ duration: 5, ease: 'linear' }}
               className={`absolute bottom-0 left-0 h-1 w-full origin-left ${
                 notification.type === 'error' ? 'bg-red-500' : 
                 notification.type === 'success' ? 'bg-green-500' : 'bg-accent'
               }`}
             />

             {/* Content */}
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
               notification.type === 'error' ? 'bg-red-500/10 text-red-500' : 
               notification.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-accent/10 text-accent'
             }`}>
                {notification.type === 'error' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : notification.type === 'success' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
             </div>

             <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground opacity-40 mb-1">Fit & Fab Notification</p>
                <p className="text-xs font-bold text-foreground leading-snug">{notification.message}</p>
             </div>

             <button 
               onClick={hideNotification}
               className="p-2 hover:bg-white/5 rounded-lg transition-colors text-foreground/20"
             >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
