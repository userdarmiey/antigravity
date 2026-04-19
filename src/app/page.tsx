"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight as ArrowIcon } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import CategoriesRow from "@/components/products/CategoriesRow";
import { motion, useScroll, useSpring } from "framer-motion";
import LaunchCountdown from "@/components/ui/Countdown";

export default function Home() {
  const subtext = "Premium streetwear that fits you perfectly. We make clothes that make you look good and stand out from everyone else.";

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
            <span className="relative inline-block overflow-hidden mt-2 md:-mt-8">
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

      {/* WHAT THE FAM SAYS - SOCIAL PROOF */}
      <section className="py-32 bg-surface/20 border-t border-border relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black mb-4">Reviews</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">What the Fam Says</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Bolaji", text: "Best quality I've seen in a while. The fit is actually crazy.", rating: 5 },
              { name: "Chidi", text: "Looked better in person than on the site. Arrived in 2 days. 10/10.", rating: 5 },
              { name: "Seyi", text: "Finally a brand that gets streetwear right in Nigeria. Premium stuff.", rating: 5 }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-surface/40 backdrop-blur-3xl border border-border p-8 rounded-[2rem] hover:border-accent/40 transition-all group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-accent rounded-full" />
                  ))}
                </div>
                <p className="text-foreground/80 font-medium mb-6 leading-relaxed italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center font-black text-[10px]">{review.name[0]}</div>
                  <span className="text-xs font-black uppercase tracking-widest text-foreground">{review.name}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">Verified User</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK SECTION */}
      <section className="py-32 border-t border-border relative z-10 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black mb-4">Summer '24 Archive</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Shop the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Fit</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Urban Explorer", desc: "Heavy jersey hoodie + Cargo setup", img: "https://picsum.photos/seed/look1/800/1000" },
              { title: "Midnight Tech", desc: "Oversized graphic tee + Tech shorts", img: "https://picsum.photos/seed/look2/800/1000" }
            ].map((look, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group rounded-[3rem] overflow-hidden border border-border aspect-[4/5]"
              >
                <img src={look.img} alt={look.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                
                <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent text-[10px] font-black uppercase tracking-widest mb-2">{look.title}</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-4">{look.desc}</h3>
                  <button className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all">
                    Shop This Fit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
