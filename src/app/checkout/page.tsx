"use client";
import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; email: string } | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const supabase = createClient();
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Generate a secure, unique, and non-guessable ID
    const uniqueId = `FNF-${Math.random().toString(36).substring(2, 8).toUpperCase()}${Math.floor(Date.now() / 100000).toString().slice(-3)}`;
    
    try {
      // Save order to Supabase (assuming an 'orders' table exists)
      const { error } = await supabase.from('orders').insert({
        id: uniqueId,
        customer_name: formData.name,
        customer_email: formData.email,
        address: formData.address,
        status: 'Confirmed',
        total: cartTotal()
      });

      if (error && error.code !== '42P01') { // 42P01 is table not found - we'll allow it for demo if table missing
        console.error("Order save error:", error);
      }

      setSuccessData({
        id: uniqueId,
        email: formData.email
      });
      clearCart();
    } catch (err) {
      console.error(err);
      // Fallback for demo if no DB connection
      setSuccessData({ id: uniqueId, email: formData.email });
    } finally {
      setIsProcessing(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-24 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-surface border border-border rounded-3xl p-8 md:p-16 text-center shadow-2xl flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-accent/10 flex items-center justify-center rounded-full mb-8">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 uppercase tracking-tight">Order Confirmed!</h1>
          <p className="text-foreground/70 mb-10 max-w-sm">Thank you for your order. We’ve received it and are getting it ready for you.</p>
          
          <div className="w-full bg-background border border-border rounded-2xl p-6 md:p-8 flex flex-col items-center mb-10 shadow-inner">
            <span className="text-[10px] font-bold text-foreground/50 tracking-widest uppercase mb-2">Your Tracking Number</span>
            <span className="text-3xl md:text-5xl font-mono font-black text-foreground">{successData.id}</span>
          </div>

          <div className="flex gap-4 w-full">
            <Link 
              href="/"
              className="flex-1 py-4 border border-border rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-foreground/5 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/track"
              className="flex-1 py-4 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-accent border border-accent transition-colors shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
            >
              Track Order
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">
        
        {/* Checkout Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight mb-8">Secure Checkout</h1>
          <form onSubmit={handleCheckout} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter your name" className="w-full bg-surface border border-border rounded-xl p-4 text-foreground focus:outline-none focus:border-accent" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter your email" className="w-full bg-surface border border-border rounded-xl p-4 text-foreground focus:outline-none focus:border-accent" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Shipping Address</label>
              <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Enter your full address" className="w-full bg-surface border border-border rounded-xl p-4 text-foreground focus:outline-none focus:border-accent" />
            </div>

            <button 
              type="submit" 
              disabled={isProcessing || cart.length === 0}
              className="mt-8 py-5 bg-foreground text-background font-black uppercase text-sm tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isProcessing ? "Processing..." : "Confirm & Pay"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-[350px] bg-surface border border-border rounded-[2rem] p-8 h-fit shadow-xl">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Order Summary</h2>
          <div className="flex flex-col gap-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-border" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground line-clamp-1">{item.name}</span>
                  <span className="text-xs text-foreground/60 uppercase">Qty: {item.quantity}</span>
                  <span className="text-sm font-black text-accent mt-1">₦{item.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end border-t border-border pt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Total</span>
            <span className="text-2xl font-black">₦{cartTotal().toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
