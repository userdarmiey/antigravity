"use client";
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Product } from '@/components/products/ProductCard';
import { categories } from '@/components/products/CategoriesRow';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Link from 'next/link';
import { playPopSound } from '@/utils/sound';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [notification, setNotification] = useState<{product: Product, size: string, color: string} | null>(null);
  const notificationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { addItem, openCart } = useStore();
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      
      // Handle Mock Products for testing
      if (params.id.startsWith('mock-')) {
        const parts = params.id.split('-');
        const keyword = parts[1] || 'Essentials';
        const cat = categories.find(c => c.keyword === keyword);
        const dummyImg = cat?.image || "";
        
        setProduct({
          id: params.id,
          name: keyword + " " + parts[2],
          price: 18000 + (Math.floor(Math.random() * 20) * 1000),
          category: keyword,
          image: dummyImg
        } as Product);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
      if (data) {
        setProduct({
          ...data,
          price: Math.max(10000, Math.min(40000, data.price))
        });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full border border-accent border-t-transparent animate-spin" />
        <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Syncing Archive...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
        <h1 className="text-foreground/20 text-9xl font-black italic">404</h1>
        <div className="flex flex-col items-center gap-4">
           <span className="text-accent text-xs font-black tracking-[0.4em] uppercase">Coordinate Not Found</span>
           <Link href="/" className="px-8 py-3 border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Return to Grid
           </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor && product) {
      playPopSound();
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      setNotification({
        product,
        size: selectedSize,
        color: selectedColor
      });
      addItem(product);
      
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 blur-[180px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
        {/* Visual Matrix */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[3/4] bg-surface/50 border border-border rounded-[3rem] overflow-hidden flex items-center justify-center p-12"
        >
          <div className="absolute top-8 left-8 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
             <span className="text-[10px] text-accent/50 font-black uppercase tracking-widest">Aura Registry: {product.id}</span>
          </div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain filter drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Narrative & Control */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center gap-12"
        >
          <div className="flex flex-col gap-6">
            <span className="text-accent text-xs font-black tracking-[0.5em] uppercase px-4 py-1.5 border border-accent/20 bg-accent/5 rounded-full w-fit">
              {product.category}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tight leading-none italic">
              {product.name}
            </h1>
            <div className="flex items-end gap-2">
               <span className="text-4xl font-black text-foreground italic">₦{product.price.toLocaleString()}</span>
               <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest mb-2">Incl. Import Duties</span>
            </div>
          </div>

          <p className="text-nebula text-lg md:text-xl font-light leading-relaxed max-w-xl">
            A manifestation of the Gestar Protocol. Engineered with high-performance synthetic materials and precision weaving for the urban echelon. This artifact is designed to resist environmental degradation while maintaining a primal silhouette.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em]">Color Tone Selection</span>
              <div className="flex gap-4">
                {['Carbon', 'Void', 'Neon Surge'].map(tone => (
                  <button 
                    key={tone} 
                    onClick={() => setSelectedColor(tone)}
                    className={`px-8 py-4 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedColor === tone ? "bg-accent text-white border-accent shadow-2xl shadow-accent/20" : "bg-transparent text-foreground border-border hover:border-accent"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em]">Size Calibration</span>
              <div className="flex gap-4">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 rounded-xl text-[12px] font-black flex items-center justify-center transition-all ${
                      selectedSize === size ? "bg-accent text-white border-accent" : "bg-transparent text-foreground border-border hover:border-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            disabled={!selectedSize || !selectedColor}
            onClick={handleAddToCart}
            className={`w-full py-8 rounded-3xl font-black text-xs uppercase tracking-[0.6em] transition-all relative overflow-hidden ${
              selectedSize && selectedColor 
              ? "bg-foreground text-background hover:bg-accent hover:text-white shadow-2xl shadow-accent/10" 
              : "bg-foreground/5 text-foreground/20 cursor-not-allowed border border-border"
            }`}
          >
            {selectedSize && selectedColor ? "Add to Cart" : "Select Options"}
          </button>
        </motion.div>
      </div>

      {/* Add to Cart Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[1500] bg-surface border border-border shadow-2xl shadow-accent/10 rounded-2xl p-4 flex items-center gap-4 min-w-[340px] md:min-w-[400px] backdrop-blur-2xl"
          >
            <div className="w-12 h-12 rounded-xl bg-background overflow-hidden shrink-0 border border-border">
               <img src={notification.product.image} alt={notification.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-grow">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-0.5">Added to Cart</span>
               <span className="text-sm font-bold text-foreground line-clamp-1">{notification.product.name}</span>
               <span className="text-[9px] text-foreground/40 font-black uppercase tracking-widest">{notification.size} / {notification.color}</span>
            </div>
            <button
               onClick={() => {
                 setNotification(null);
                 openCart();
               }}
               className="shrink-0 px-4 py-2.5 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all shadow-xl active:scale-95"
            >
               Proceed to Checkout
            </button>
            <button
               onClick={() => setNotification(null)}
               className="absolute -top-2 -right-2 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/50 transition-colors shadow-lg z-[1510]"
            >
               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

