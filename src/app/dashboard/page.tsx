"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFunding, setIsFunding] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      setUser(session.user);

      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      setWallet(walletData || { balance: 0 });
      setLoading(false);
    };

    getData();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-foreground/10 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
      <AnimatePresence>
        {isFunding && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFunding(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[2.5rem] p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Fund Wallet</h2>
              <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-widest mb-8">Add money to your FNF account.</p>
              
              <div className="space-y-4">
                <input 
                  type="number" 
                  placeholder="AMOUNT (₦)" 
                  className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-4 text-xs font-bold focus:border-accent outline-none"
                />
                <button className="w-full py-5 bg-accent text-white font-black uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-black transition-all">
                  Next Step
                </button>
                <button 
                  onClick={() => setIsFunding(false)}
                  className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-foreground/20 hover:text-red-500 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Profile */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface border border-border rounded-[2.5rem] p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground/5" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-accent/10 mb-6 overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="A" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-accent flex items-center justify-center text-2xl font-black text-white">
                    {user?.email?.[0].toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-black uppercase italic">{user?.user_metadata?.full_name || 'MEMBER'}</h2>
              <p className="text-foreground/20 text-[10px] font-black uppercase tracking-widest mt-1">{user?.email}</p>
            </div>

            <div className="mt-10 space-y-3">
              <button className="w-full py-4 bg-foreground/5 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest">
                My Orders
              </button>
              <button 
                onClick={handleLogout}
                className="w-full py-4 border border-red-500/10 text-red-500/40 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest rounded-xl"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>

        {/* Balance & Wallet */}
        <div className="lg:col-span-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">FNF WALLET</span>
              <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">
                    ₦{(wallet?.balance || 0).toLocaleString()}
                  </h1>
                </div>
                <button 
                  onClick={() => setIsFunding(true)}
                  className="px-10 py-5 bg-white text-accent rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Fund Wallet
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-[2.5rem] p-10 min-h-[300px] flex flex-col items-center justify-center"
          >
             <p className="text-foreground/10 text-[10px] font-black uppercase tracking-[0.4em]">No activity yet.</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
