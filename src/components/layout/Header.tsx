"use client";
import React from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function Header() {
  const { toggleCart, cart, searchQuery, setSearchQuery } = useStore();
  const cartSize = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="w-full border-b border-border sticky top-0 bg-background/40 backdrop-blur-3xl z-50 transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-8 h-24 flex items-center justify-between gap-8">
        <Link href="/" className="font-sans font-black text-xl md:text-2xl tracking-[0.1em] uppercase text-foreground cursor-pointer hover:text-accent transition-colors shrink-0">
          GESTAR
        </Link>
        
        {/* Real-time Reactive Search Bar */}
        <div className="hidden lg:flex flex-1 items-center bg-foreground/5 border border-border rounded-full px-6 max-w-md ml-8 transition-colors focus-within:border-accent shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
          <svg className="w-4 h-4 text-nebula mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-foreground font-mono text-xs py-3 placeholder:text-nebula placeholder:tracking-widest"
          />
        </div>

        <nav className="hidden lg:flex gap-12 text-sm uppercase tracking-[0.1em] text-nebula font-bold shrink-0">
          <Link href="/#products" className="hover:text-foreground transition-colors duration-500 relative group py-2">Shop</Link>
          <Link href="/#philosophy" className="hover:text-foreground transition-colors duration-500 relative group py-2">Our Story</Link>
          <Link href="/track" className="hover:text-foreground transition-colors duration-500 relative group py-2">Track Order</Link>
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleCart} 
            className="text-foreground hover:text-accent transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-3 shrink-0"
          >
            Cart 
            <span className="bg-accent px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              {cartSize}
            </span>
          </button>
        </div>
      </div>
    </header>


  );
}
