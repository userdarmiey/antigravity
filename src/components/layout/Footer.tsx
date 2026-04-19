"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border py-24 mt-32 bg-background transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-8 w-full flex flex-col md:flex-row justify-between gap-16">
        <div className="flex flex-col gap-6 max-w-sm">
          <span className="font-sans font-bold text-3xl tracking-[0.15em] uppercase text-foreground">FIT AND FAB</span>
          <p className="text-nebula font-light text-sm tracking-wider leading-relaxed">
            Premium streetwear made to fit you perfectly and make you stand out from the crowd. 
          </p>
        </div>
        
        <div className="flex gap-16 flex-wrap">
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground text-xs uppercase tracking-[0.2em] font-bold mb-2">Help</h4>
            <Link href="/shipping" className="text-nebula hover:text-accent text-sm tracking-wider transition-colors">Shipping</Link>
            <Link href="/returns" className="text-nebula hover:text-accent text-sm tracking-wider transition-colors">Returns</Link>
            <Link href="/contact" className="text-nebula hover:text-accent text-sm tracking-wider transition-colors">Contact Us</Link>
            <a href="mailto:fitandfabofficials@gmail.com" className="text-nebula hover:text-accent text-sm tracking-wider transition-colors">fitandfabofficials@gmail.com</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground text-xs uppercase tracking-[0.2em] font-bold mb-2">Legal</h4>
            <Link href="/terms" className="text-nebula hover:text-accent text-sm tracking-wider transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-nebula hover:text-accent text-sm tracking-wider transition-colors">Privacy Policy</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <h4 className="text-foreground text-xs uppercase tracking-[0.2em] font-bold mb-2">Stay Updated</h4>
          <p className="text-nebula text-xs tracking-wider mb-2">Join our newsletter to get the latest news on our drops.</p>
          <div className="flex bg-foreground/5 border border-border rounded-none p-1 focus-within:border-accent transition-colors">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="w-full bg-transparent border-none outline-none px-4 text-xs tracking-widest text-foreground placeholder:text-nebula/50"
            />
            <button 
              onClick={() => alert("You're on the list! We'll keep you posted.")}
              className="bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-accent hover:text-white transition-all"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-8 w-full mt-16 pt-8 border-t border-border text-nebula text-xs uppercase tracking-widest flex justify-between items-center flex-wrap gap-4">
        <p>&copy; {new Date().getFullYear()} Fit and Fab Archives. All rights reserved.</p>
        <p className="font-bold text-foreground tracking-[0.3em]">Explore the Unseen</p>
      </div>
    </footer>
  );
}
