"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Truck, MapPin, ShieldCheck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-background min-h-screen text-foreground pt-32 pb-24 overflow-hidden relative">
      {/* Global Aesthetics */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] font-black uppercase">Shipping Info</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tight uppercase italic leading-[0.9] pb-4"
          >
            Shipping <br/> <span className="py-2 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">& Delivery</span>
          </motion.h1>
        </div>

        {/* Content Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-16"
        >
          {/* Section 01: Logistics */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 01</span>
              <h3 className="text-xl font-black uppercase">Transit Time</h3>
            </div>
            <div className="space-y-6">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                All orders are shipped within 48 hours of payment confirmation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-background border border-border rounded-2xl flex flex-col gap-2">
                    <Truck className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-bold uppercase text-foreground/40">Standard Delivery</span>
                    <span className="font-bold text-white">5-7 Working Days</span>
                 </div>
                 <div className="p-4 bg-background border border-border rounded-2xl flex flex-col gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-bold uppercase text-foreground/40">Express Delivery</span>
                    <span className="font-bold text-white">2-3 Working Days</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border w-full" />

          {/* Section 02: Tracking */}
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase italic">Coordinate 02</span>
              <h3 className="text-xl font-black uppercase">Live Tracking</h3>
            </div>
            <div className="space-y-4">
              <p className="text-nebula text-sm leading-relaxed font-mono">
                Once your order has shipped, a tracking link will be sent to your email so you can follow your delivery in real time.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-accent">
                 <MapPin className="w-4 h-4" />
                 <span className="uppercase tracking-widest">Live Tracking Available</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <Link 
              href="/#products"
              className="inline-flex items-center gap-4 bg-foreground text-background px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all shadow-xl group"
            >
              Return to Catalog
              <div className="w-2 h-2 rounded-full bg-background transition-colors group-hover:bg-white" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
