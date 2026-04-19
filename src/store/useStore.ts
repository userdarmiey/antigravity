import { create } from 'zustand';
import { Product } from '@/components/products/ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  searchQuery: string;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setSearchQuery: (query: string) => void;
  cartTotal: () => number;
  clearCart: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  cart: [],
  isCartOpen: false,
  searchQuery: "",

  addItem: (product) => {
    const currentCart = get().cart;
    const existing = currentCart.find(item => item.id === product.id);
    if (existing) {
      set({
        cart: currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      set({
        cart: [...currentCart, { ...product, quantity: 1 }]
      });
    }
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      set({ cart: get().cart.filter(item => item.id !== productId) });
    } else {
      set({
        cart: get().cart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      });
    }
  },

  removeItem: (id) => {
    set({ cart: get().cart.filter(item => item.id !== id) });
  },

  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

  openCart: () => set({ isCartOpen: true }),

  closeCart: () => set({ isCartOpen: false }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  cartTotal: () => get().cart.reduce((total, item) => total + (item.price * item.quantity), 0),

  clearCart: () => set({ cart: [] }),
}));
