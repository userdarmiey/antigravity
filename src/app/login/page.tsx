"use client";
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useStore();
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      showNotification("Check your Gmail!", "success");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pt-32 flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-border rounded-[2.5rem] p-10 md:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-blue-400 to-accent" />
        
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4 italic italic">The Orbit</h1>
        <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-widest mb-10">Wallet & Exclusive Access.</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left">
             <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Login Error</p>
             <p className="text-[10px] font-bold text-red-500/60 uppercase leading-snug">{error}</p>
             {error.includes('provider is not enabled') && (
               <a 
                 href="https://app.supabase.com" 
                 target="_blank" 
                 className="mt-3 block w-full py-2 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg text-center"
               >
                 Enable Google in Supabase
               </a>
             )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl flex items-center justify-center gap-4 hover:bg-accent hover:text-white transition-all group active:scale-[0.98]"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-[1px] bg-border" />
            <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">or</span>
            <div className="flex-1 h-[1px] bg-border" />
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-3 text-left">
             <input 
               type="email" 
               placeholder="GMAIL ADDRESS" 
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-4 text-xs font-bold focus:border-accent outline-none"
             />
             <button 
               type="submit"
               disabled={loading}
               className="w-full py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all font-black uppercase text-[10px] tracking-widest rounded-xl disabled:opacity-50"
             >
               {loading ? "SENDING..." : "SEND MAGIC LINK"}
             </button>
          </form>

          <Link 
            href="/" 
            className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 hover:text-red-500 transition-all"
          >
            Cancel & Go Back
          </Link>
        </div>
        
        <p className="mt-12 text-[9px] font-bold text-foreground/10 uppercase tracking-[0.2em] leading-relaxed">
          Made for the Fam.
        </p>
      </motion.div>
    </div>
  );
}
