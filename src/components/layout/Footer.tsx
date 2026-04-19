"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-32 mt-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-20">
        <div className="md:col-span-4 flex flex-col gap-8">
          <Link href="/" className="font-black text-4xl tracking-tighter uppercase text-foreground italic group">
            GES<span className="text-accent group-hover:text-blue-400 transition-colors">TAR</span>
          </Link>
          <p className="text-foreground/40 font-medium text-base leading-relaxed max-w-sm">
            Premium clothes engineered for the stellar landscape. Built for the streets, made to stand out.
          </p>
          <div className="flex gap-4">
            <a href="mailto:hello@gestar.com" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all border border-white/5 hover:border-transparent">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2 flex flex-col gap-6">
          <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-accent">Menu</h4>
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
            <Link href="/#products" className="text-foreground/40 hover:text-foreground transition-colors">Shop All</Link>
            <Link href="/lookbook" className="text-foreground/40 hover:text-foreground transition-colors">Lookbook</Link>
            <Link href="/orbit" className="text-foreground/40 hover:text-foreground transition-colors">The Orbit</Link>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-accent">Legal</h4>
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-foreground/40">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-8">
           <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-accent">Newsletter</h4>
           <div className="relative">
             <input 
               type="email" 
               placeholder="JOIN THE ORBIT" 
               className="w-full bg-white/5 border border-white/5 rounded-3xl px-8 py-6 text-xs font-black tracking-[0.2em] outline-none focus:border-accent transition-all placeholder:text-foreground/10"
             />
             <button 
               onClick={() => alert("You're in!")}
               className="absolute right-2 top-2 bottom-2 px-8 bg-foreground text-background font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-white transition-all"
             >
               Go
             </button>
           </div>
           <p className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest leading-loose">
             We only send emails for major drops. No spam, ever.
           </p>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 w-full mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} GESTAR ORIGINALS. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Server Status: Online</span>
        </div>
      </div>
    </footer>
  );
}
