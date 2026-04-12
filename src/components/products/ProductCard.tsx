"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/catalog/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-[400px] relative group shrink-0"
      >

      <div className="group relative w-[400px] h-[580px] transition-all duration-700 select-none shrink-0">
        <div className="absolute inset-0 bg-surface border border-border group-hover:border-accent/40 group-hover:shadow-[0_10px_60px_rgba(0,0,0,0.4)] transition-all duration-700 rounded-[2.5rem] overflow-hidden">
          {/* Neon Category Header */}
          <div className="absolute top-8 left-8 z-20">
            <div className="bg-surface/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-accent/50 shadow-[0_0_15px_var(--accent)]">
              <span className="text-[9px] font-black text-accent tracking-[0.2em] uppercase">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Centered - Dark Silhouette Style */}
          <div className="absolute inset-x-0 top-12 bottom-32 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-1000"
            />
          </div>

          {/* Info Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                <span className="text-[9px] font-bold text-accent/60 tracking-[0.4em] uppercase">SYSTEM.ARCHIVE</span>
              </div>
              <h3 className="text-[20px] font-black text-foreground tracking-tight uppercase leading-tight mt-1 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
              <div className="flex flex-col">
                <span className="text-[10px] text-foreground/20 font-bold uppercase tracking-widest">COST</span>
                <span className="text-2xl font-black text-foreground tracking-tighter italic">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] font-black text-accent/50 uppercase tracking-[0.3em]">RESERVE</span>
                <button
                  className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center bg-accent/5 group-hover:bg-accent group-hover:shadow-[0_0_20px_var(--accent)] transition-all pointer-events-none"
                >
                  <svg className="w-4 h-4 text-accent group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </Link>
  );
};

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}
