"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ProcessAnimation() {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1, 
      scale: 1,
      transition: { delay: i * 2, duration: 0.8 }
    })
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: i * 2 + 0.8, duration: 1.2, ease: "easeInOut" }
    })
  };

  return (
    <div className="w-full bg-surface/20 backdrop-blur-xl py-12 md:py-20 border-y border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 relative">
          
          {/* STEP 1: PACK */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <motion.div 
              custom={0}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-20 h-20 rounded-3xl bg-accent/10 border border-accent/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Safe Packing</span>
          </div>

          {/* LINE 1 */}
          <div className="hidden md:block flex-1 h-[2px] relative top-[-15px]">
            <svg className="w-full h-full">
               <motion.path 
                 custom={0}
                 variants={lineVariants}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 d="M 0 1 H 300" 
                 stroke="currentColor" 
                 strokeWidth="2" 
                 strokeDasharray="4 4"
                 className="text-accent/30"
               />
            </svg>
          </div>

          {/* STEP 2: SHIP */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <motion.div 
              custom={1}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-20 h-20 rounded-3xl bg-blue-400/10 border border-blue-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.2)]"
            >
              <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2.5a.5.5 0 01-1 0V16m-1 1h-1m-9 0H3m1 0h1m10 1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1m-1-5v5m-5-5v5m-5-5v5" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">On The Way</span>
          </div>

          {/* LINE 2 */}
          <div className="hidden md:block flex-1 h-[2px] relative top-[-15px]">
            <svg className="w-full h-full">
               <motion.path 
                 custom={1}
                 variants={lineVariants}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 d="M 0 1 H 300" 
                 stroke="currentColor" 
                 strokeWidth="2" 
                 strokeDasharray="4 4"
                 className="text-blue-400/30"
               />
            </svg>
          </div>

          {/* STEP 3: DELIVER + STARS */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <motion.div 
              custom={2}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-20 h-20 rounded-3xl bg-green-400/10 border border-green-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.2)]"
            >
              <div className="relative">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {/* 3 STARS */}
                <div className="absolute -top-6 -right-6 flex gap-1">
                   {[0,1,2].map(i => (
                     <motion.div
                       key={i}
                       initial={{ opacity: 0, scale: 0 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 5.5 + (i * 0.2), duration: 0.5 }}
                       className="text-yellow-400 text-xs drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                     >
                       ★
                     </motion.div>
                   ))}
                </div>
              </div>
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">Delivered</span>
          </div>

        </div>
      </div>
    </div>
  );
}
