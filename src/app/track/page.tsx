"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { id: 'Confirmed', label: 'Order Confirmed', icon: '🛒' },
  { id: 'Factory', label: 'At Factory', icon: '🏭' },
  { id: 'Rider', label: 'With Rider', icon: '🏍️' },
  { id: 'Delivered', label: 'Delivered', icon: '✅' },
];

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | 'found' | 'error'>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    
    setIsScanning(true);
    setTrackingResult(null);

    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingCode: trackingId.trim().toUpperCase() })
      });
      
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      
      setOrderData(data.order);
      setTimeline(data.tracking || []);
      setTrackingResult('found');
    } catch (err) {
      setTrackingResult('error');
    } finally {
      setIsScanning(false);
    }
  };

  const getCurrentStageIndex = () => {
    if (!timeline.length) return 0;
    const currentStatus = timeline[timeline.length - 1].status;
    const index = stages.findIndex(s => currentStatus.includes(s.id));
    return index === -1 ? 0 : index;
  };

  const currentStage = getCurrentStageIndex();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-surface/40 backdrop-blur-3xl border border-border rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent text-2xl mb-6">
            📦
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground italic">Follow Order</h1>
          <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest mt-4">See where your clothes are right now.</p>
        </div>

        {!trackingResult && !isScanning && (
          <form onSubmit={handleTrack} className="flex flex-col gap-8 w-full max-w-md mx-auto">
            <div className="relative group">
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="GSR-XXXXXX"
                className="w-full bg-background/50 border-2 border-border rounded-2xl px-6 py-6 text-xl font-mono text-foreground focus:outline-none focus:border-accent transition-all text-center tracking-widest placeholder:opacity-20 shadow-inner"
                required
              />
              <div className="absolute inset-0 border-2 border-accent rounded-2xl scale-105 opacity-0 group-focus-within:opacity-10 group-focus-within:scale-100 transition-all pointer-events-none" />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-accent text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98]"
            >
              Check Now
            </button>
          </form>
        )}

        {isScanning && (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 border-2 border-accent/20 rounded-full" />
              <div className="absolute top-0 left-0 w-24 h-24 border-2 border-t-accent rounded-full animate-spin" />
              <div className="absolute inset-2 bg-accent/5 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Searching for order</span>
              <div className="flex gap-1">
                {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, delay: i * 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full" />)}
              </div>
            </div>
          </div>
        )}

        {trackingResult === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 text-2xl">❌</div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black uppercase">Order Not Found</h3>
              <p className="text-sm text-foreground/40 max-w-xs">We can't find that tracking ID. Please check if you typed it right.</p>
            </div>
            <button onClick={() => setTrackingResult(null)} className="text-[10px] font-black uppercase tracking-widest text-accent border-b border-accent pb-1">Try again</button>
          </motion.div>
        )}

        {trackingResult === 'found' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col gap-16">
            
            {/* Visual 2D Map Step Area */}
            <div className="relative px-4">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
                  className="h-full bg-accent shadow-[0_0_20px_var(--accent)]"
                />
              </div>

              <div className="flex justify-between relative z-10">
                {stages.map((stage, idx) => (
                  <div key={stage.id} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 border-2 ${idx <= currentStage ? 'bg-background border-accent shadow-xl scale-110' : 'bg-background border-border text-foreground/20 grayscale scale-95'}`}>
                      {stage.icon}
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-1">
                      <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${idx <= currentStage ? 'text-foreground' : 'text-foreground/20'}`}>
                        {stage.label}
                      </span>
                      {idx === currentStage && (
                        <motion.div layoutId="indicator" className="w-1.5 h-1.5 bg-accent rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-background/40 border border-border p-8 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black text-foreground/30 uppercase tracking-widest">Active Status</span>
                <span className="text-2xl font-black text-accent italic uppercase tracking-tight">{timeline.length > 0 ? timeline[timeline.length - 1].status : 'Searching...'}</span>
              </div>
              <div className="bg-background/40 border border-border p-8 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black text-foreground/30 uppercase tracking-widest">Destination</span>
                <span className="text-2xl font-black text-foreground italic uppercase tracking-tight truncate">{orderData?.address || 'Fit & Fab Hub'}</span>
              </div>
            </div>

            {/* Detailed Log */}
            <div className="bg-background/20 rounded-3xl p-8 flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 border-b border-border pb-4">Recent Updates</span>
              <div className="flex flex-col gap-8">
                {timeline.slice().reverse().map((event, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-black uppercase italic tracking-tight">{event.status}</span>
                      <span className="text-[10px] text-foreground/50 font-medium">{event.message}</span>
                    </div>
                    <span className="text-[10px] font-mono whitespace-nowrap text-foreground/30" suppressHydrationWarning>
                      {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setTrackingResult(null)} className="w-full py-6 bg-transparent border border-border text-foreground font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-foreground/5">Close</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
