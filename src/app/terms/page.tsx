"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Scale, FileText, Anchor } from 'lucide-react';

export default function TermsPage() {
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
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] font-black uppercase">Legal: Binding Framework</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          >
            Terms of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Void</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Section Header */}
          <div className="flex items-center gap-6 mb-12">
             <FileText className="w-8 h-8 text-accent" />
             <div className="h-[1px] flex-1 bg-border" />
             <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em]">Revised 01.2026</span>
          </div>

          <div className="prose prose-invert max-w-none space-y-12 font-mono text-sm text-nebula leading-relaxed">
             <section>
                <h3 className="text-foreground font-black text-lg uppercase mb-4 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                   1. Deployment Agreement
                </h3>
                <p>
                   By executing a purchase, you enter into a binding deployment agreement with the Fit and Fab Archive. You acknowledge that all artifacts are engineered for specific environmental parameters and should be treated as high-precision equipment.
                </p>
             </section>

             <section>
                <h3 className="text-foreground font-black text-lg uppercase mb-4 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                   2. Intellectual Property
                </h3>
                <p>
                   The "Echelon" philosophy, all vector geometries, and technical fabrication methods remain the exclusive property of the Archive. Digital replication or physical distortion of these architectures is strictly prohibited.
                </p>
             </section>

             <section>
                <h3 className="text-foreground font-black text-lg uppercase mb-4 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                   3. Void Clauses
                </h3>
                <p>
                   Fit and Fab reserves the right to terminate any deployment if the user is found in violation of the brand philosophy. Our archive is a collection of tools for those who operate at the frontier; misuse of these artifacts voids all support protocols.
                </p>
             </section>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground/40">
             <span>ARCHIVE REFERENCE: FF-LEGAL-001</span>
             <Anchor className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
