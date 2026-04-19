"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cart, removeItem, cartTotal, updateQuantity } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          
          {/* Slide-out Drawer */}
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-background/80 backdrop-blur-3xl border-l border-white/5 z-[101] flex flex-col p-8 md:p-12 shadow-2xl selection:bg-accent selection:text-white overflow-hidden"
          >
            {/* Minimalist Ambient Glow */}
            <div className="absolute top-0 right-0 w-full h-1/2 bg-accent/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-accent mb-1">Archive Items</span>
                <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">Bag</h2>
              </div>
              <button 
                onClick={toggleCart} 
                className="group p-2 hover:bg-white/5 rounded-full transition-all"
              >
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <span className="absolute w-full h-[2px] bg-foreground rotate-45 group-hover:bg-accent transition-all" />
                  <span className="absolute w-full h-[2px] bg-foreground -rotate-45 group-hover:bg-accent transition-all" />
                </div>
              </button>
            </div>
            
            <div className="relative z-10 flex-1 overflow-y-auto flex flex-col gap-10 no-scrollbar pb-8">
              {/* Refined Free Shipping Progress */}
              {cart.length > 0 && (
                <div className="flex flex-col gap-2.5 mb-2">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <span className={cartTotal() >= 50000 ? 'text-accent' : 'text-foreground/40'}>
                      {cartTotal() >= 50000 ? 'Free Shipping Active' : 'Shipping Goal'}
                    </span>
                    <span className="text-foreground/20">₦50,000</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${Math.min((cartTotal() / 50000) * 100, 100)}%` }}
                       className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
                     />
                  </div>
                  <p className="text-[8px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
                    {cartTotal() >= 50000 
                      ? "Order qualified for free shipping." 
                      : `Add ₦${(50000 - cartTotal()).toLocaleString()} to get free shipping.`}
                  </p>
                </div>
              )}

              {cart.map(item => (
                <motion.div 
                   layout 
                   initial={{ opacity: 0, x: 20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   key={item.id} 
                   className="flex gap-6 group"
                >
                  <div className="w-20 h-24 bg-white/5 rounded-2xl overflow-hidden relative shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-foreground text-[11px] font-black uppercase tracking-widest line-clamp-1">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-foreground/20 hover:text-red-500 transition-colors">
                           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <p className="text-accent font-black text-[10px] tracking-widest">₦{item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-3 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                          <button 
                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
                             className="text-[10px] text-foreground/40 hover:text-foreground transition-colors px-1"
                          >—</button>
                          <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                          <button 
                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
                             className="text-[10px] text-foreground/40 hover:text-foreground transition-colors px-1"
                          >+</button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {cart.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20 opacity-20">
                   <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center text-2xl font-black">?</div>
                   <span className="text-[10px] font-black uppercase tracking-[0.5em]">Bag is empty</span>
                </div>
              )}
            </div>
            
            <div className="relative z-10 pt-8 border-t border-white/5 mt-auto">
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                   <span>Archived Total</span>
                   <span>₦{cartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                   <span>Shipping</span>
                   <span className={cartTotal() >= 50000 ? "text-green-500" : ""}>
                     {cartTotal() >= 50000 ? "FREE" : "₦2,500"}
                   </span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                   <span className="text-[11px] font-black uppercase tracking-[0.3em]">Total</span>
                   <span className="text-3xl font-black tracking-tighter">
                     ₦{(cartTotal() + (cartTotal() >= 50000 || cart.length === 0 ? 0 : 2500)).toLocaleString()}
                   </span>
                </div>

                {/* Coupon Code Section */}
                <div className="mt-6 border-t border-white/5 pt-6">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest uppercase outline-none focus:border-accent transition-all placeholder:text-foreground/20"
                    />
                    <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:border-transparent transition-all">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 mt-4">
                   <span className="text-[8px] font-black uppercase tracking-widest text-accent">Payment Secured</span>
                   <div className="flex gap-1.5">
                      {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-accent rounded-full animate-pulse" />)}
                   </div>
                </div>
              </div>
              
              <Link
                href="/checkout"
                onClick={toggleCart}
                className={`block w-full text-center bg-foreground text-background font-black text-[11px] uppercase tracking-[0.4em] py-5 rounded-2xl transition-all duration-500 hover:bg-accent hover:text-white active:scale-[0.98] shadow-2xl ${cart.length === 0 ? 'opacity-20 pointer-events-none' : ''}`}
              >
                Checkout Now
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
