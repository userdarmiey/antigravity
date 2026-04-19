"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProductCard, Product } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  // Unwrap promise context to satisfy Next.js 15 routing rules where params might be a Promise in the future,
  // but for Next.js 14 dynamic routes params are available directly.
  const keyword = decodeURIComponent(params.slug);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase.from('products').select('*');
      if (data) {
        if (keyword) {
           const filtered = data.filter(p => 
              p.name.toLowerCase().includes(keyword.toLowerCase()) || 
              p.category.toLowerCase().includes(keyword.toLowerCase())
           );
           setProducts(filtered);
        } else {
           setProducts(data);
        }
      }
      setLoading(false);
    }
    fetchProducts();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-40 px-6 md:px-12">
      <div className="max-w-[1700px] mx-auto w-full">
        <div className="flex items-center gap-4 mb-16">
          <button onClick={() => window.history.back()} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground/5 transition-all">
            <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tight">
            {keyword} Collection
          </h1>
        </div>

        {loading ? (
          <div className="w-full py-40 flex flex-col items-center justify-center gap-6">
             <div className="w-20 h-20 rounded-full border border-accent/20 border-t-accent animate-spin" />
             <span className="text-foreground/80 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Loading Collection...</span>
          </div>
        ) : products.length > 0 ? (
          <div className="flex flex-wrap gap-4 md:gap-12">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-center">
             <div className="w-24 h-24 mb-4 rounded-full bg-surface border border-border flex items-center justify-center">
                <span className="text-4xl text-foreground font-black">?</span>
             </div>
             <h2 className="text-2xl font-black text-foreground uppercase tracking-widest">No Items Found</h2>
             <p className="text-sm font-medium text-foreground/60 max-w-sm">We couldn't find any items in this specific collection at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
