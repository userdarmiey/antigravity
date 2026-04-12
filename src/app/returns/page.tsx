"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefreshCcw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="bg-background min-h-screen text-foreground pt-32 pb-24 overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] font-black uppercase">Standard: Re-entry Protocol</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.9] pb-4"
          >
            Returns & <br/> <span className="py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Matrix</span>
          </motion.h1>
        </div>

        {/* Content Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-16"
        >
          {/* Section 01: Eligibility */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 01</span>
              <h3 className="text-xl font-black uppercase">Eligibility</h3>
            </div>
            <div className="space-y-6">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                Artifacts must be in their original state. Any signs of atmosphere degradation or physical distortion and the return protocol will be voided.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-4 text-xs tracking-wider">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>ORIGINAL TAGS INTACT</span>
                 </li>
                 <li className="flex items-center gap-4 text-xs tracking-wider">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>UNWORN BEYOND INITIAL FITTING</span>
                 </li>
                 <li className="flex items-center gap-4 text-xs tracking-wider">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>14-DAY RE-ENTRY WINDOW</span>
                 </li>
              </ul>
            </div>
          </div>

          <div className="h-[1px] bg-border w-full" />

          {/* Section 02: Process */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 02</span>
              <h3 className="text-xl font-black uppercase">Initiation</h3>
            </div>
            <div className="space-y-4">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                To initiate a re-entry sequence, please contact the Support Protocol with your deployment ID. Once verified, a shipping vector will be provided.
              </p>
              <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex gap-4">
                 <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                 <p className="text-[10px] text-red-500/80 font-bold uppercase tracking-widest leading-loose">
                    Limited drop items marked as "VOID-FINAL" are not eligible for re-entry. Please check the product metadata before deployment.
                 </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-4 bg-accent text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-xl group"
            >
              Contact Support
              <RefreshCcw className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
