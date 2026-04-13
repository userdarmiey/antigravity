"use client";
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { ProductCard, Product } from '@/components/products/ProductCard';
import { createClient } from '@/utils/supabase/client';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full border border-accent border-t-transparent animate-spin" />
        <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Scanning Archive...</span>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 max-w-[1600px] mx-auto w-full">
      <div className="mb-16 border-b border-white/5 pb-12">
         <h1 className="text-5xl md:text-7xl uppercase font-heading text-white mb-6 tracking-tighter italic">Collection /// 001</h1>
         <p className="text-[#B0B0B0] max-w-2xl text-lg md:text-xl font-light tracking-wide leading-relaxed">
           The complete archive of our current season. Uncompromising quality meets astral aesthetics. Designed for the orbit.
         </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
           <p className="text-nebula italic">No artifacts found in the current coordinate set.</p>
        )}
      </div>
    </div>
  );
}

