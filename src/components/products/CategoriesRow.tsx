import React from 'react';

const categories = [
  { name: "Solo Leveling Collection", items: "21 Items Available", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800" },
  { name: "Plain Wear", items: "14 Items Available", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
  { name: "FNS Essentials", items: "12 Items Available", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800" },
  { name: "Premium Pants", items: "8 Items Available", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800" }
];

export default function CategoriesRow() {
  return (
    <div className="w-full relative px-0 md:px-12 mb-20">
       <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-8 snap-x px-6 md:px-0 scroll-smooth">
          {categories.map((cat, idx) => (
             <div key={idx} className="relative w-[280px] md:w-[400px] h-[220px] md:h-[280px] shrink-0 rounded-[2rem] overflow-hidden snap-start group cursor-pointer shadow-xl border border-border">
                <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-col z-10 pointer-events-none">
                   <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-1">{cat.name}</h3>
                   <span className="text-white/60 text-xs font-medium">{cat.items}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
