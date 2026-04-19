"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const looks = [
  { id: 1, title: "Archive 01", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800", span: "row-span-2" },
  { id: 2, title: "Stellar Tee", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", span: "row-span-1" },
  { id: 3, title: "Nebula Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", span: "row-span-1" },
  { id: 4, title: "Void Cargo", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800", span: "row-span-2" },
  { id: 5, title: "Solar Cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800", span: "row-span-1" },
  { id: 6, title: "Aura Joggers", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=800", span: "row-span-1" },
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-xs font-black tracking-[0.5em] uppercase mb-4 block">Visual Identity</span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-foreground italic leading-none">Lookbook</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
          {looks.map((look) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`relative rounded-[2rem] overflow-hidden group cursor-pointer border border-border ${look.span}`}
            >
              <Image 
                src={look.image} 
                alt={look.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-black tracking-widest text-accent uppercase mb-2 block">Capture</span>
                <h3 className="text-2xl font-black text-white uppercase">{look.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
