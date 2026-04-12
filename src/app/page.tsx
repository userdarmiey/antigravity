"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight as ArrowIcon } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const subtext = "Primal aesthetics from the edge of the universe. A distilled echelon of streetwear materiality.";

  // Typewriter Variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.5 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -5,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full bg-background overflow-x-hidden relative transition-colors duration-500">
      {/* GLOBAL GRAIN OVERLAY */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* HERO SECTION */}
      <div className="relative w-full min-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* ... (Hero content stays same) ... */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('/streetwear_hero_model_1776012629243.png')] bg-cover bg-center grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)]" />
        </div>

        {/* Technical Sidebar Text */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-24 items-center z-20">
          <span className="rotate-90 text-[10px] tracking-[1em] text-accent/50 uppercase font-black">EST. 2026</span>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
          <span className="rotate-90 text-[10px] tracking-[1em] text-foreground/20 uppercase font-black">COLLECTION 01</span>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-24 items-center z-20">
          <span className="rotate-90 text-[10px] tracking-[1em] text-foreground/20 uppercase font-black">SYSTEM TYPE: FABRICATION</span>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
          <span className="rotate-90 text-[10px] tracking-[1em] text-accent/50 uppercase font-black">COORDINATES: L-01</span>
        </div>

        {/* Decorative Markers */}
        <div className="absolute top-32 left-12 w-4 h-4 border-l border-t border-foreground/20 z-20" />
        <div className="absolute top-32 right-12 w-4 h-4 border-r border-t border-foreground/20 z-20" />
        <div className="absolute bottom-32 left-12 w-4 h-4 border-l border-b border-foreground/20 z-20" />
        <div className="absolute bottom-32 right-12 w-4 h-4 border-r border-b border-foreground/20 z-20" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center px-6"
        >
          <div className="mb-8 flex flex-col items-center">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               transition={{ delay: 0.5 }}
               className="text-[10px] tracking-[0.8em] uppercase text-accent font-bold mb-4"
             >
               Hyper-Technical Streetwear
             </motion.span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.85] text-foreground text-center flex flex-col">
            <span className="relative inline-block overflow-hidden pb-2">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                FIT AND
              </motion.span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-foreground"
              >
                FABRIC
              </motion.span>
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 max-w-lg text-center text-foreground text-xs md:text-sm tracking-[0.2em] font-medium leading-loose uppercase"
          >
            Detaching from traditional boundaries. <br className="hidden md:block"/> Engineered for the urban void.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 flex items-center gap-8"
          >
            <Link 
              href="#products" 
              className="px-10 py-5 bg-foreground text-background text-[11px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all duration-300 shadow-[20px_20px_0_var(--border)]"
            >
              Shop Direct
            </Link>
            <div className="hidden md:flex flex-col gap-1 items-start">
               <span className="text-[10px] text-foreground/30 font-bold tracking-widest uppercase">Release 01 // Archive</span>
               <div className="flex gap-2">
                  {/* Spinning Neon FNF Star */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative w-4 h-4 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-full h-full text-accent drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" fill="currentColor">
                       <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                    <span className="absolute text-[5px] font-black text-background pointer-events-none">fnf</span>
                  </motion.div>
                  <div className="w-2 h-2 bg-foreground/10 rounded-full mt-1" />
                  <div className="w-2 h-2 bg-foreground/10 rounded-full mt-1" />
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* COLLECTION SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        id="products" 
        className="bg-transparent w-full pt-20 pb-40 relative z-10 border-t border-border"
      >
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 w-full">
           <div className="flex flex-col mb-24 items-center">
             <h2 className="text-foreground text-xs uppercase tracking-[0.5em] font-bold opacity-40 mb-4">Material Manifestations</h2>
             <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />
           </div>
          <ProductGrid />
        </div>
      </motion.section>

      {/* THE PHILOSOPHY SECTION */}
      <motion.section 
        id="philosophy"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-transparent w-full py-48 border-t border-border relative z-10 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-transparent flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-[900px] h-[900px] bg-accent/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" 
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center"
        >
          <span className="text-accent tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold mb-8">Internal Directive</span>
          <h2 className="text-5xl md:text-8xl font-sans font-bold tracking-[0.1em] uppercase text-foreground mb-14 leading-none">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Philosophy</span>
          </h2>
          <p className="text-nebula text-lg md:text-xl font-mono tracking-widest leading-relaxed max-w-5xl opacity-80">
            Status is not inherited; it is engineered. The <span className="font-bold text-foreground">FIT AND FAB</span> philosophy is built for the Echelon—those who operate at the edge of the artistic and technical frontier. We reject traditional boundaries in favor of high-performance distortion. Our archive is a collection of tools for the modern pioneer, designed for those who view the city not as a home, but as a grid to be mastered.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}

