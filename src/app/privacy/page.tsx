"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, EyeOff, Lock, Cpu } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen text-foreground pt-32 pb-24 overflow-hidden relative font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] font-black uppercase">Standard: Information Shield</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          >
            Privacy <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Paradigm</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-16"
        >
          {/* Section 01: Encryption */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 01</span>
              <h3 className="text-xl font-black uppercase">Data Encryption</h3>
            </div>
            <div className="space-y-6">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                Your biological and telemetry data is encrypted using military-grade protocols before being stored in the Archive. We do not sell coordinates to third-party entities.
              </p>
              <div className="flex gap-6">
                 <div className="flex flex-col items-center gap-2">
                    <Lock className="w-8 h-8 text-accent/50" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground/20">AES-256</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Shield className="w-8 h-8 text-accent/50" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground/20">HYPER-SECURE</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border w-full" />

          {/* Section 02: Tracking */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 02</span>
              <h3 className="text-xl font-black uppercase">Cookie Matrix</h3>
            </div>
            <div className="space-y-4">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                We utilize minimal tracking vectors to optimize your experience within the grid. These trackers are non-invasive and primarily used for session persistence and deployment efficiency.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-accent">
                 <EyeOff className="w-4 h-4" />
                 <span className="uppercase tracking-widest">INCIDIOUS TRACKING VOIDED</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border w-full" />

          {/* Section 03: Rights */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 03</span>
              <h3 className="text-xl font-black uppercase">Access Rights</h3>
            </div>
            <div className="space-y-4">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                You maintain absolute control over your archival record. You may request the total eradication of your data from the central grid at any time.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] border border-accent/30 px-6 py-2 rounded-lg hover:bg-accent/10 transition-colors">
                 Request Eradication
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
