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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-surface border-l border-border z-[101] flex flex-col p-10 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] selection:bg-accent selection:text-white overflow-hidden transition-colors"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[100%] h-[100%] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-accent/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10 flex justify-between items-center mb-16">
              <div className="flex flex-col gap-1">
                <h2 className="text-xs tracking-[0.2em] uppercase font-bold text-accent flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Your Cart
                </h2>
                <span className="text-2xl font-black tracking-tighter text-foreground">FIT & FAB</span>
              </div>
              <button 
                onClick={toggleCart} 
                className="group p-3 rounded-full hover:bg-foreground/5 transition-colors border border-transparent hover:border-border"
              >
                <div className="w-6 h-6 relative flex items-center justify-center">
                  <span className="absolute w-full h-[1px] bg-foreground rotate-45 group-hover:bg-accent transition-colors" />
                  <span className="absolute w-full h-[1px] bg-foreground -rotate-45 group-hover:bg-accent transition-colors" />
                </div>
              </button>
            </div>
            
            <div className="relative z-10 flex-1 overflow-y-auto flex flex-col gap-10 no-scrollbar">
              {/* Free Shipping Progress */}
              <div className="flex flex-col gap-3 bg-foreground/5 p-6 rounded-2xl border border-border">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground/60">
                  <span>{cartTotal() >= 50000 ? 'Free Shipping Active' : 'Spend More, Ship Free'}</span>
                  <span>₦50,000</span>
                </div>
                <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${Math.min((cartTotal() / 50000) * 100, 100)}%` }}
                     className="h-full bg-accent"
                   />
                </div>
                <p className="text-[9px] font-medium text-foreground/40 uppercase tracking-widest">
                  {cartTotal() >= 50000 
                    ? "Nice! You get free shipping on this order." 
                    : `Add ₦${(50000 - cartTotal()).toLocaleString()} more to get free shipping.`}
                </p>
              </div>
              {cart.map(item => (
                <motion.div 
                   layout 
                   initial={{ opacity: 0, y: 10 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   whileHover={{ x: -4 }}
                   key={item.id} 
                   className="flex gap-6 items-center group cursor-pointer"
                >
                  <div className="w-24 h-28 bg-background overflow-hidden relative border border-border group-hover:border-accent transition-all duration-500 shadow-xl">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-foreground text-[13px] font-bold tracking-tight uppercase leading-tight group-hover:text-accent transition-colors">{item.name}</h3>
                    <p className="text-accent font-mono text-[10px] font-bold tracking-widest">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-4 mt-3">
                       <div className="flex items-center gap-3 bg-foreground/5 px-2 py-1 rounded-sm border border-border">
                         <span className="text-[8px] text-foreground/40 uppercase font-black mr-1">QTY</span>
                         <div className="flex items-center gap-2">
                            <button 
                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
                               className="w-5 h-5 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded transition-colors"
                            >
                              -
                            </button>
                            <span className="text-[10px] text-foreground font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
                               className="w-5 h-5 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded transition-colors"
                            >
                              +
                            </button>
                         </div>
                       </div>
                       <button onClick={() => removeItem(item.id)} className="text-[10px] text-nebula hover:text-red-500 transition-colors font-black tracking-widest uppercase ml-auto">
                         Drop
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {cart.length === 0 && (
                <div className="text-accent/20 font-black text-[10px] uppercase flex flex-col items-center justify-center h-full gap-6 tracking-[0.5em]">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border border-accent/10 flex items-center justify-center animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">✦</div>
                  </div>
                  Your Cart is Empty
                </div>
              )}
            </div>
            
            <div className="relative z-10 pt-10 mt-auto">
              <div className="flex justify-between items-end mb-10 border-b border-border pb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-foreground/50 uppercase tracking-[0.2em] text-[10px] font-bold">Subtotal</span>
                  <span className="text-foreground font-black text-3xl tracking-tighter leading-none">₦{cartTotal().toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="w-8 h-[2px] bg-accent" />
                  <span className="text-accent text-[10px] font-bold tracking-widest">SECURE CHECKOUT</span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                onClick={toggleCart}
                className={`block w-full text-center bg-foreground text-background font-black text-[12px] uppercase tracking-[0.4em] py-6 transition-all duration-500 hover:bg-accent hover:text-white active:scale-[0.98] ${cart.length === 0 ? 'opacity-30 pointer-events-none' : ''}`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
