"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard, Product } from './ProductCard';
import { useStore } from '@/store/useStore';
import { createClient } from '@/utils/supabase/client';
import { playPopSound } from '@/utils/sound';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const searchQuery = useStore((state) => state.searchQuery);
  const addItem = useStore((state) => state.addItem);
  const openCart = useStore((state) => state.openCart);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [notification, setNotification] = useState<{product: Product, size: string, color: string} | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (data) {
        const incrementedData = data.map((p, idx) => ({
          ...p,
          price: 15000 + ((idx % 6) * 5000) // Ranges: 15k, 20k, 25k, 30k, 35k, 40k
        }));
        setProducts(incrementedData);
      }
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
      playPopSound();
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      setNotification({
        product: selectedProduct,
        size: selectedSize,
        color: selectedColor
      });
      addItem(selectedProduct);
      setSelectedProduct(null);
      setSelectedSize(null);
      setSelectedColor(null);
      
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border border-accent/20 border-t-accent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-accent text-[8px] font-bold uppercase tracking-[0.2em] animate-pulse">Wait</div>
        </div>
        <span className="text-foreground/80 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Loading Clothes...</span>
      </div>
    );
  }

  return (
    <div className="w-full relative px-6 md:px-12">
      {/* Search Result Status */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-1">
          <span className="text-accent text-[10px] uppercase font-black tracking-[0.4em]">Available Now</span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Archive Drop</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface/40 backdrop-blur-xl border border-white/5 rounded-full">
           <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{filteredProducts.length} items</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 pb-32">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
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
                    <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.1em]">Select Color</span>
                    <div className="flex gap-2">
                      {['Black', 'DarkGrey', 'Blue'].map(tone => (
                        <button 
                          key={tone} 
                          onClick={(e) => { e.stopPropagation(); setSelectedColor(tone); }}
                          className={`flex-1 py-3 border-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
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
                    <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.1em]">Select Size</span>
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
                  {selectedSize && selectedColor ? "Add to Cart" : "Select Options"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
