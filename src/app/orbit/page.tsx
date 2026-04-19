"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function OrbitPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 flex items-center justify-center relative overflow-hidden">
        {/* Stellar Background Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl bg-surface/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 relative z-10 shadow-2xl"
        >
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
              <div className="flex flex-col gap-2">
                 <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">Identity Registry</span>
                 <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground italic leading-none">The Orbit</h1>
              </div>
              <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex flex-col items-center">
                 <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Loyalty Tier</span>
                 <span className="text-xl font-black text-accent uppercase tracking-tighter">Stellar Elite</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { label: "Points Earned", value: "12,450", sub: "Gestar Tokens" },
                { label: "Orders Made", value: "08", sub: "Dispatched & Delivered" },
                { label: "Exclusive Drops", value: "03", sub: "Early Access Passes" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-3xl group hover:border-accent/40 transition-all">
                   <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-4 block">{stat.label}</span>
                   <span className="text-4xl font-black text-foreground tabular-nums group-hover:text-accent transition-colors">{stat.value}</span>
                   <p className="text-xs text-foreground/20 mt-2 font-medium">{stat.sub}</p>
                </div>
              ))}
           </div>

           <div className="bg-accent/10 border border-accent/20 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-10 items-center justify-between">
              <div className="flex flex-col gap-4">
                 <h3 className="text-2xl font-black uppercase text-foreground">Next Stellar Drop</h3>
                 <p className="text-foreground/60 text-sm max-w-sm leading-relaxed">As a Stellar Elite member, you have early access to the upcoming Archive Collection. Your link will go live 24 hours before the public.</p>
              </div>
              <button className="px-10 py-5 bg-accent text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-white hover:text-accent transition-all">
                 View Early Drop
              </button>
           </div>
        </motion.div>
    </div>
  );
}
