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
        className="w-[240px] md:w-[400px] relative group shrink-0"
      >

      <div className="group relative w-[240px] md:w-[400px] h-[340px] md:h-[580px] transition-all duration-700 select-none shrink-0">
        <div className="absolute inset-0 bg-surface/30 backdrop-blur-3xl border border-white/5 group-hover:border-accent/20 transition-all duration-700 rounded-[2rem] overflow-hidden">
          {/* Subtle Discount Pill */}
          <div className="absolute top-5 left-5 z-30">
            <div className="bg-accent text-white px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase shadow-lg">
              {Math.floor((product.price % 5) + 1)}% OFF
            </div>
          </div>

          {/* Product Image Area */}
          <div className="absolute inset-x-0 top-12 bottom-24 md:bottom-32 flex items-center justify-center p-6 md:p-10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Clean Info Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-accent tracking-[0.3em] uppercase opacity-60">
                {product.category}
              </span>
              <h3 className="text-sm md:text-xl font-black text-foreground uppercase tracking-tight line-clamp-1">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xl md:text-2xl font-black text-foreground italic">
                ₦{product.price.toLocaleString()}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:border-transparent group-hover:shadow-[0_0_20px_var(--accent)] transition-all">
                <svg className="w-4 h-4 text-foreground group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
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
