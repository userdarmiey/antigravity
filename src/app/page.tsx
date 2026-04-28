"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight as ArrowIcon } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { motion, useScroll, useSpring } from "framer-motion";
import LaunchCountdown from "@/components/ui/Countdown";
import ProcessAnimation from "@/components/ui/ProcessAnimation";

export default function Home() {
  const subtext = "Clothes that fit you well and make you look good.";

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
    <div className="w-full bg-[#050505] text-[#FAFAFA] overflow-x-hidden relative transition-colors duration-500">
      {/* ANNOUNCEMENT TICKER */}
      <div className="w-full bg-accent text-white py-1.5 overflow-hidden flex items-center relative z-[110]">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-[9px] font-black uppercase tracking-[0.3em]"
        >
          <span>Free shipping in Lagos 🚀</span>
          <span>Pay with Paystack to get 5% off ✨</span>
          <span>New Clothes Out Now ⚡</span>
          <span>Free shipping in Lagos 🚀</span>
          <span>Pay with Paystack to get 5% off ✨</span>
          <span>New Clothes Out Now ⚡</span>
        </motion.div>
      </div>

      {/* LIVE VISITORS COUNTER */}
      <div className="absolute top-16 right-8 z-50 hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full scale-90">
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
         <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">Live Now</span>
      </div>
      {/* GLOBAL GRAIN OVERLAY */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* HERO SECTION */}
      <div className="relative w-full min-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* ... (Hero content stays same) ... */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('/fit_and_fab_hero_new.png')] bg-cover bg-center brightness-125"
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
               Best Streetwear
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
                Wear the vibe.
              </motion.span>
            </span>
            <span className="relative inline-block overflow-hidden mt-2 md:-mt-8">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-foreground"
              >
                Stay fab.
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

      {/* PROCESS ANIMATION SECTION */}
      <ProcessAnimation />

      {/* COLLECTION SECTION */}
      {/* FEATURED CATEGORIES - PREMIUM CARDS */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { name: "Best Hoodie", desc: "Heavy cotton fit", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", color: "from-blue-500/20" },
               { name: "New Tees", desc: "Best Cotton Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", color: "from-accent/20" },
               { name: "Classic Vault", desc: "Old-school style", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800", color: "from-purple-500/20" }
             ].map((cat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5"
               >
                 <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                 <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60`} />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                 
                 <div className="absolute bottom-10 left-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2 block">Collection</span>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{cat.name}</h3>
                    <p className="text-foreground/60 text-sm font-medium">{cat.desc}</p>
                 </div>
                 
                 <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                       <ArrowIcon className="w-5 h-5 text-black" />
                    </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* PRODUCT GRID SECTION */}
      <section id="products" className="py-24 border-t border-border relative z-10 bg-surface/5">
        <div className="max-w-[1700px] mx-auto">
          <ProductGrid />
        </div>
      </section>
      {/* COUNTDOWN LAUNCH SECTION */}
      <LaunchCountdown />

      {/* WHAT THE FAM SAYS - SOCIAL PROOF */}
      <section className="py-24 bg-surface/10 border-t border-border relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black mb-4">Reviews</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">What people Say</h2>
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

      {/* REFER AND WIN */}
      <section className="py-24 border-t border-border relative z-10 overflow-hidden bg-surface/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black mb-4">Invite Friends</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Share <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">&</span> Win</h2>
            <p className="text-nebula text-lg mt-8 max-w-xl">Invite your friends to the shop and win free clothes every month.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-surface/40 backdrop-blur-3xl border border-border p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 group hover:border-accent/40 transition-all">
               <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center font-black text-2xl text-accent border border-accent/20">1</div>
               <h3 className="text-xl font-black uppercase tracking-tight">Get Your Link</h3>
               <p className="text-foreground/60 text-sm">Sign up for an account and get your own unique sharing link in seconds.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-surface/40 backdrop-blur-3xl border border-border p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 group hover:border-accent/40 transition-all">
               <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center font-black text-2xl text-accent border border-accent/20">2</div>
               <h3 className="text-xl font-black uppercase tracking-tight">Share the Vibe</h3>
               <p className="text-foreground/60 text-sm">Send your link to your friends. When they buy their first fit, you get points.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-surface/40 backdrop-blur-3xl border border-border p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 group hover:border-accent/40 transition-all">
               <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center font-black text-2xl text-accent border border-accent/20">3</div>
               <h3 className="text-xl font-black uppercase tracking-tight">Win Big</h3>
               <p className="text-foreground/60 text-sm">Top 3 people on the leaderboard every month win a ₦50,000 shopping voucher.</p>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center">
             <button className="px-12 py-6 bg-foreground text-background text-xs font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-accent hover:text-white transition-all shadow-2xl">
                Join the Contest
             </button>
             <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                     </div>
                   ))}
                </div>
                <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">1,200+ people joined already</span>
             </div>
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
        className="bg-transparent w-full py-32 border-t border-border relative z-10 overflow-hidden"
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
            Style is a journey. <span className="font-bold text-foreground">FIT AND FAB</span> is made for you. We make clothes that fit your lifestyle and make you look great every day. No stress, just great style for everyone.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
