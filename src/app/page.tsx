"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight as ArrowIcon } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import CategoriesRow from "@/components/products/CategoriesRow";
import { motion, useScroll, useSpring } from "framer-motion";
import LaunchCountdown from "@/components/ui/Countdown";

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

        {/* Technical Sidebar Text Removed per user request */}


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
               Premium Streetwear
             </motion.span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.85] text-foreground text-center flex flex-col">
            <span className="relative inline-block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block text-5xl md:text-7xl"
              >
                Made to Fit.
              </motion.span>
            </span>
            <span className="relative inline-block overflow-hidden -mt-3">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-foreground"
              >
                Made to Stand Out.
              </motion.span>
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 max-w-lg text-center text-foreground/80 text-sm md:text-base font-medium leading-loose"
          >
            Built different. <br className="hidden md:block"/> Made for the streets.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 flex justify-center w-full"
          >
            <Link 
              href="#products" 
              className="px-10 py-5 bg-foreground text-background text-[13px] font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-300 shadow-[10px_10px_0_var(--border)]"
            >
              Shop Now
            </Link>
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
        <div className="max-w-[1700px] mx-auto w-full">
           <CategoriesRow />
           <div className="flex flex-col mb-12 items-start px-6 lg:px-12">
             <h2 className="text-foreground text-2xl font-bold tracking-tight mb-2">Featured Items</h2>
           </div>
          <ProductGrid />
        </div>
      </motion.section>

      {/* COUNTDOWN LAUNCH SECTION */}
      <LaunchCountdown />

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
          <span className="text-accent tracking-[0.2em] text-xs uppercase font-bold mb-8">Why Choose Us</span>
          <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-[0.05em] uppercase text-foreground mb-10 leading-none">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Story</span>
          </h2>
          <p className="text-nebula text-lg md:text-2xl leading-relaxed max-w-4xl opacity-90 font-medium">
            Looking good is a choice. <span className="font-bold text-foreground">FIT AND FAB</span> is made for people who want to look fresh. We make comfortable and stylish clothes for your everyday outing. No stress, just great clothes for the city.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
