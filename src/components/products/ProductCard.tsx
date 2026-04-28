import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  return (
    <div className="relative group w-full max-w-[400px]">
      <Link href={`/catalog/${product.id}`} className="block">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full relative group shrink-0"
        >

          <div className="group relative w-full h-[320px] sm:h-[400px] md:h-[580px] transition-all duration-700 select-none shrink-0">
            <div className="absolute inset-0 bg-surface/30 backdrop-blur-3xl border border-white/5 group-hover:border-accent/20 transition-all duration-700 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              {/* Subtle Discount Pill */}
              <div className="absolute top-5 left-5 z-30 flex gap-2">
                <div className="bg-accent text-white px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase shadow-lg">
                  {Math.floor((product.price % 5) + 1)}% OFF
                </div>
                {product.price > 20000 && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase shadow-lg animate-pulse">
                    Selling Fast 🔥
                  </div>
                )}
              </div>

              {/* Product Image Area */}
              <div className="absolute inset-x-0 top-10 bottom-24 md:bottom-32 flex items-center justify-center p-4 md:p-10">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 240px, 400px"
                  />
                </div>
              </div>

              {/* Clean Info Area */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-accent tracking-[0.3em] uppercase opacity-60">
                      {product.category}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-foreground/20" />
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-sm md:text-xl font-black text-foreground uppercase tracking-tight line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-green-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Verify Genuine
                    </span>
                    <span className="text-lg md:text-2xl font-black text-foreground italic">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>
                    <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onQuickView?.(product);
                    }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-accent hover:border-transparent hover:shadow-[0_0_20px_var(--accent)] transition-all z-20"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-foreground group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  colorVariations?: {
    color: string;
    image: string;
  }[];
}
