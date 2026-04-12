"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard, Product } from './ProductCard';
import { useStore } from '@/store/useStore';
import { createClient } from '@/utils/supabase/client';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const searchQuery = useStore((state) => state.searchQuery);
  const addItem = useStore((state) => state.addItem);
  const toggleCart = useStore((state) => state.toggleCart);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleDeployment = () => {
    if (selectedProduct && selectedSize && selectedColor) {
      addItem(selectedProduct);
      setSelectedProduct(null);
      setSelectedSize(null);
      setSelectedColor(null);
      toggleCart();
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border border-accent/20 border-t-accent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-accent text-[8px] font-black uppercase tracking-[0.4em] animate-pulse">Sync</div>
        </div>
        <span className="text-foreground/20 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Retrieving Inventory Matrix...</span>
      </div>
    );
  }

  return (
    <div className="w-full relative px-12 transition-colors duration-500">
      {/* System Status Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
        <div className="flex flex-col items-center md:items-start gap-1">
          <h2 className="text-foreground text-[10px] font-black tracking-[0.6em] uppercase opacity-40">System Architecture</h2>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="text-accent font-mono text-[10px] tracking-[0.3em] font-black uppercase">Archive Matrix // Active</span>
          </div>
        </div>
        
        {/* Secondary Modular Controls */}
        <div className="flex gap-4">
           <button 
             onClick={() => scroll('left')}
             className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-accent hover:border-accent transition-all active:scale-95 bg-foreground/5 backdrop-blur-md"
           >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
           </button>
           <button 
             onClick={() => scroll('right')}
             className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-accent hover:border-accent transition-all active:scale-95 bg-foreground/5 backdrop-blur-md"
           >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
           </button>
        </div>
      </div>

      {/* Single Straight Line Exhibit */}

      <div 
        ref={scrollContainerRef}
        className="flex gap-12 overflow-x-auto no-scrollbar pb-32 snap-x snap-mandatory px-4 -mx-4 items-start scroll-smooth"
      >
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="snap-start shrink-0 first:ml-4"
          >
            <ProductCard product={product} />
          </div>
        ))}

        {/* Archival Spacer */}
        <div className="min-w-[400px] flex items-center justify-center h-[300px]">
          <div className="flex flex-col items-center gap-6 opacity-20">
            <div className="w-16 h-[1px] bg-accent" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-foreground font-mono italic">END OF LINE protocol</span>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-surface border border-border rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[80vh]"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedProduct(null); }}
                className="absolute top-6 right-6 z-[1100] w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-xl border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all shadow-xl group/close"
              >
                <svg className="w-5 h-5 transition-transform group-hover/close:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Vertical Preview Section - MODULATED COLOR */}
              <div className="w-full md:w-[45%] bg-background/50 flex items-center justify-center p-6 relative overflow-hidden">
                <motion.img 
                  initial={false}
                  animate={{ 
                    filter: selectedColor === 'Void' ? 'brightness(0.2) grayscale(1)' : 
                            selectedColor === 'Neon Surge' ? 'hue-rotate(180deg) saturate(1.5)' : 
                            'none'
                  }}
                  transition={{ duration: 0.5 }}
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-contain drop-shadow-2xl z-10" 
                />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-[55%] p-8 flex flex-col justify-between bg-surface">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-accent text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20">{selectedProduct.category}</span>
                      <span className="text-foreground/20 text-[8px] font-bold tracking-widest uppercase italic">ID: {selectedProduct.id}</span>
                    </div>
                    <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-tight">{selectedProduct.name}</h2>
                    <span className="text-xl font-black text-accent italic mt-0.5 tracking-tighter">₦{selectedProduct.price.toLocaleString()}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-black text-foreground/40 uppercase tracking-[0.2em]">Available Tones</span>
                    <div className="flex gap-2">
                      {['Carbon', 'Void', 'Neon Surge'].map(tone => (
                        <button 
                          key={tone} 
                          onClick={(e) => { e.stopPropagation(); setSelectedColor(tone); }}
                          className={`flex-1 py-3 border-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${
                            selectedColor === tone 
                            ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" 
                            : "bg-transparent text-foreground border-border hover:border-accent"
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-black text-foreground/40 uppercase tracking-[0.2em]">Size Calibration</span>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <button 
                          key={size} 
                          onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                          className={`w-10 h-10 border-2 rounded-lg text-[10px] font-black flex items-center justify-center transition-all duration-300 ${
                            selectedSize === size 
                            ? "bg-accent text-white border-accent" 
                            : "bg-transparent text-foreground border-border hover:border-foreground/20"
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
                  onClick={(e) => { e.stopPropagation(); handleDeployment() }}
                  className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-xl transition-all shadow-xl mt-6 active:scale-[0.98] ${
                    selectedSize && selectedColor 
                    ? "bg-accent text-white hover:bg-opacity-90 shadow-accent/20" 
                    : "bg-foreground/5 text-foreground/20 cursor-not-allowed border border-border"
                  }`}
                >
                  {selectedSize && selectedColor ? "Initiate Deployment" : "Configure Parameters"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
