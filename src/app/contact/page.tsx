"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Send, MessageSquare, Mail, Terminal } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen text-foreground pt-32 pb-24 overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] font-black uppercase">Get in Touch</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          >
            Contact <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Us</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Contact Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
          >
             <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="Your name"
                        className="bg-background/50 border border-border rounded-xl px-6 py-4 text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                      />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        className="bg-background/50 border border-border rounded-xl px-6 py-4 text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                      />
                   </div>
                </div>

                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Subject</label>
                   <select className="bg-background/50 border border-border rounded-xl px-4 py-4 text-sm font-mono focus:outline-none focus:border-accent appearance-none cursor-pointer">
                      <option className="bg-background">ORDER STATUS</option>
                      <option className="bg-background">RETURN REQUEST</option>
                      <option className="bg-background">GENERAL ENQUIRY</option>
                      <option className="bg-background">BRAND APPLICATION</option>
                   </select>
                </div>

                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Your Message</label>
                   <textarea 
                     rows={5}
                     placeholder="How can we help you?"
                     className="bg-background/50 border border-border rounded-xl px-6 py-4 text-sm font-mono focus:outline-none focus:border-accent transition-colors resize-none"
                   />
                </div>

                <button 
                  className="w-full bg-accent text-white py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-4 group"
                >
                   Send Message
                   <Send className="w-4 h-4 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                </button>
             </form>
          </motion.div>

          {/* Sidebar Metrics */}
          <div className="space-y-8">
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="bg-surface border border-border p-8 rounded-[2.5rem] backdrop-blur-xl"
             >
                <div className="flex items-center gap-4 mb-6">
                   <Terminal className="w-5 h-5 text-accent" />
                   <h3 className="text-sm font-black uppercase tracking-widest">Global HQ</h3>
                </div>
                <div className="space-y-4 text-nebula text-xs font-mono leading-relaxed">
                   <p>123 High Street</p>
                   <p>London, W1A 1AA</p>
                   <p>United Kingdom</p>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="bg-surface border border-border p-8 rounded-[2.5rem] backdrop-blur-xl"
             >
                <div className="flex items-center gap-4 mb-6">
                   <Mail className="w-5 h-5 text-accent" />
                   <h3 className="text-sm font-black uppercase tracking-widest">Connect</h3>
                </div>
                <div className="space-y-4 text-nebula text-xs font-mono">
                   <a href="mailto:fitandfabofficials@gmail.com" className="hover:text-accent transition-colors cursor-pointer">fitandfabofficials@gmail.com</a>
                   <p className="hover:text-accent transition-colors cursor-pointer">+44 20 0000 0000</p>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
