"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const categories = [
  { name: "Solo Leveling", keyword: "Solo", items: "21 Items Available", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800" },
  { name: "Plain Wear", keyword: "Plain", items: "14 Items Available", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
  { name: "FNF Essentials", keyword: "Essentials", items: "12 Items Available", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800" },
  { name: "Premium Pants", keyword: "Pant", items: "8 Items Available", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800" },
  { name: "Light Shorts", keyword: "Short", items: "5 Items Available", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800" }
];

const duplicatedCategories = [...categories, ...categories];

export default function CategoriesRow() {
  const router = useRouter();

  const handleCategoryClick = (keyword: string) => {
    // Navigate to dedicated collections page instead of filtering live stock
    router.push(`/collection/${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="w-full relative mb-24 overflow-hidden Group pb-4">
       {/* Gradient masks for smooth fade over edges */}
       <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
       <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

       <motion.div 
         animate={{ x: ['0%', '-50%'] }} 
         transition={{ ease: "linear", duration: 35, repeat: Infinity }}
         className="flex gap-4 md:gap-6 w-max"
       >
          {duplicatedCategories.map((cat, idx) => (
             <div 
               key={idx} 
               onClick={() => handleCategoryClick(cat.keyword)}
               className="relative w-[280px] md:w-[400px] h-[220px] md:h-[280px] shrink-0 rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl border border-border"
             >
                <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-col z-10 pointer-events-none">
                   <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-1">{cat.name}</h3>
                   <span className="text-white/60 text-xs font-medium">{cat.items}</span>
                </div>
             </div>
          ))}
       </motion.div>
    </div>
  );
}
