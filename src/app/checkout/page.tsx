"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment logic
    setTimeout(() => {
      alert("Your payment was successful. Your order is on its way!");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Left Side: Order Summary */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
           <div className="flex flex-col gap-2">
              <Link href="/" className="text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase hover:text-white transition-colors flex items-center gap-2 mb-4">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                 Back to Shop
              </Link>
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none italic">Checkout</h1>
           </div>

           <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
              <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                 {cart.map(item => (
                    <div key={item.id} className="flex gap-6 items-center border-b border-white/5 pb-6 last:border-0">
                       <div className="w-16 h-20 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 flex flex-col gap-1">
                          <h3 className="text-[12px] font-bold uppercase tracking-tight text-white/80">{item.name}</h3>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] uppercase font-black text-blue-400">QTY: {item.quantity}</span>
                             <span className="text-sm font-black text-white italic">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40">Subtotal</span>
                    <span className="text-sm font-bold text-white">${cartTotal().toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40">Processing Fee</span>
                    <span className="text-sm font-bold text-blue-400">$0.00</span>
                 </div>
                 <div className="flex justify-between items-center pt-4">
                    <span className="text-[12px] uppercase font-black tracking-[0.4em] text-white">Total</span>
                    <span className="text-3xl font-black text-blue-500 italic shadow-blue-500/20 shadow-sm">${cartTotal().toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="flex flex-col gap-8 order-1 lg:order-2">
           <form 
             onSubmit={handlePayment}
             className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col gap-10 shadow-[0_0_80px_rgba(59,130,246,0.1)] relative"
           >
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]" />
                 <h2 className="text-[11px] font-black tracking-[0.6em] uppercase text-white">Payment Details</h2>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm font-bold tracking-tight focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="VOID USER"
                    />
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40 ml-4">Card Number</label>
                    <input 
                      type="text" 
                      required 
                      className="bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm font-bold tracking-tight focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40 ml-4">Expiry</label>
                       <input 
                         type="text" 
                         required 
                         className="bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm font-bold tracking-tight focus:outline-none focus:border-blue-500 transition-colors"
                         placeholder="MM/YY"
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40 ml-4">CVC Code</label>
                       <input 
                         type="text" 
                         required 
                         className="bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm font-bold tracking-tight focus:outline-none focus:border-blue-500 transition-colors"
                         placeholder="***"
                       />
                    </div>
                 </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className={`w-full py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] transition-all relative overflow-hidden group ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-white hover:text-black shadow-[0_20px_60px_rgba(59,130,246,0.4)]'
                }`}
              >
                 {isProcessing ? (
                   <div className="flex items-center justify-center gap-4">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authorizing...
                   </div>
                 ) : "Pay Now"}
              </button>

              <div className="flex flex-col items-center gap-4 opacity-30">
                 <div className="w-full h-[1px] bg-white/10" />
                 <p className="text-[8px] font-mono tracking-widest text-center">YOUR DATA IS SECURE AND ENCRYPTED</p>
              </div>
           </form>
        </div>
      </motion.div>
    </div>
  );
}
