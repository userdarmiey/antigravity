"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState('');
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | 'found' | 'error'>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const supabase = createClient();
 
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId || !email) return;
    
    setIsScanning(true);
    setTrackingResult(null);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', trackingId.trim())
        .eq('customer_email', email.trim())
        .single();
      
      if (data) {
        setOrderData(data);
        setTrackingResult('found');
      } else {
        setTrackingResult('error');
      }
    } catch (err) {
      setTrackingResult('error');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-surface/50 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-blue-400 to-accent" />
        
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">Tracking System</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">Track Order</h1>
          <p className="text-foreground/60 text-sm mt-4 max-w-sm">Enter your tracking number and email to see where your package is.</p>
        </div>

        {!trackingResult && !isScanning && (
          <form onSubmit={handleTrack} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-foreground/60">Tracking ID</label>
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="e.g. FAF-893048"
                className="w-full bg-background border border-border rounded-xl px-4 py-4 text-sm font-mono text-foreground focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-foreground/60">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-background border border-border rounded-xl px-4 py-4 text-sm font-mono text-foreground focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-4 py-4 bg-foreground text-background font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-accent hover:text-white transition-all shadow-[0_5px_20px_rgba(0,0,0,0.1)] active:scale-[0.98]"
            >
              Track Now
            </button>
          </form>
        )}

        {isScanning && (
          <div className="w-full py-16 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-4 border-foreground/10 border-t-accent rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-foreground/60 animate-pulse">Finding Package...</span>
          </div>
        )}

        {trackingResult === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-red-500/10 border border-red-500/50 p-6 rounded-2xl flex flex-col items-center gap-2"
          >
            <span className="text-red-500 font-black uppercase text-xs tracking-widest">Protocol Error</span>
            <p className="text-foreground/60 text-xs text-center">Invalid Tracking ID or Email. Please verify your credentials and try again.</p>
            <button 
              onClick={() => { setTrackingResult(null); setTrackingId(''); }}
              className="mt-4 text-[10px] font-black uppercase tracking-widest text-accent hover:underline"
            >
              Retry Connection
            </button>
          </motion.div>
        )}

        {trackingResult === 'found' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2 bg-background p-6 rounded-2xl border border-border">
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">Status</span>
              <span className="text-xl font-black text-accent uppercase flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--accent)]" />
                {orderData?.status || 'On The Way'}
              </span>
              <span className="text-sm font-mono text-foreground/80 mt-2">
                {orderData?.status === 'Delivered' ? 'Arrived at Destination' : 'Arriving Soon'}
              </span>
            </div>

            {/* Tracking Path */}
            <div className="flex flex-col gap-0 py-4 relative">
              <div className="absolute left-[11px] top-[24px] bottom-[24px] w-[2px] bg-border" />
              
              <div className="flex gap-6 items-start relative z-10 py-4">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-[0_0_10px_var(--accent)]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex flex-col gap-1 -mt-1">
                  <span className="text-sm font-bold text-foreground">Coming to You</span>
                  <span className="text-xs text-foreground/50">Delivery Agent Dispatched</span>
                  <span className="text-[10px] font-mono text-foreground/30">Today, 08:42 AM</span>
                </div>
              </div>

              <div className="flex gap-6 items-start relative z-10 py-4">
                <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                </div>
                <div className="flex flex-col gap-1 -mt-1">
                  <span className="text-sm font-bold text-foreground/60">At Sorting Center</span>
                  <span className="text-xs text-foreground/40">Abuja Hub</span>
                  <span className="text-[10px] font-mono text-foreground/30">Yesterday, 11:30 PM</span>
                </div>
              </div>

              <div className="flex gap-6 items-start relative z-10 py-4">
                 <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                </div>
                <div className="flex flex-col gap-1 -mt-1">
                  <span className="text-sm font-bold text-foreground/60">Order Ready</span>
                  <span className="text-xs text-foreground/40">Lagos Main Warehouse</span>
                  <span className="text-[10px] font-mono text-foreground/30">2 days ago, 02:15 PM</span>
                </div>
              </div>

              <div className="flex gap-6 items-start relative z-10 py-4">
                <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                </div>
                <div className="flex flex-col gap-1 -mt-1">
                  <span className="text-sm font-bold text-foreground/60">Order Confirmed</span>
                  <span className="text-[10px] font-mono text-foreground/30">2 days ago, 09:00 AM</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setTrackingResult(null); setTrackingId(''); setEmail(''); }}
              className="w-full mt-4 py-4 bg-transparent border border-border text-foreground font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-foreground/5 transition-all"
            >
              Track Another Package
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
