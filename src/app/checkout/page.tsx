"use client";
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import nextDynamic from 'next/dynamic';

const PaystackButton = nextDynamic(
  () => import('react-paystack').then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, cartTotal, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; email: string } | null>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const TEST_PUBLIC_KEY = "pk_test_d98f20ba661ad3b549177b699ac00402cac78260";

  const handleCreateOrder = async (reference: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
          },
          cart,
          total: cartTotal(),
          paymentReference: reference
        })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText.substring(0, 50)}...`);
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout Error');

      setSuccessData({
        id: data.trackingCode,
        email: formData.email
      });
      clearCart();
    } catch (err: any) {
      console.error(err);
      alert("Checkout Error: " + (err.message || "Please check your database connection or Supabase settings."));
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  const isFormValid = formData.name && formData.email && formData.phone && formData.address;

  const paystackConfig: any = {
    email: formData.email,
    amount: cartTotal() * 100,
    publicKey: TEST_PUBLIC_KEY,
    text: "Pay with Paystack",
    onSuccess: (ref: any) => {
      setIsProcessing(true);
      handleCreateOrder(ref.reference);
    },
    onClose: () => alert("Transaction cancelled."),
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-24 px-6 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-surface border border-border rounded-3xl p-8 md:p-16 text-center shadow-2xl flex flex-col items-center">
          <div className="w-20 h-20 bg-accent/10 flex items-center justify-center rounded-full mb-8 text-accent">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 uppercase tracking-tight italic">Order Done!</h1>
          <p className="text-foreground/70 mb-10 max-w-sm">Thanks for shopping with us.</p>
          <div className="w-full bg-background border border-border rounded-2xl p-6 md:p-8 flex flex-col items-center mb-10 shadow-inner">
            <span className="text-[10px] font-bold text-foreground/50 tracking-widest uppercase mb-2">Tracking ID</span>
            <span className="text-3xl md:text-5xl font-mono font-black text-foreground">{successData.id}</span>
          </div>
          <div className="flex gap-4 w-full">
            <Link href="/" className="flex-1 py-4 border border-border rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-foreground/5 transition-all text-center text-foreground">Home</Link>
            <Link href="/track" className="flex-1 py-4 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all text-center">Track Order</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black uppercase italic tracking-tight">Pay for order</h1>
            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Fill the form to pay.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Where to send it</label>
              <div className="flex flex-col gap-3">
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-bold focus:border-accent outline-none" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-bold focus:border-accent outline-none" />
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number (WhatsApp)" className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-bold focus:border-accent outline-none" />
                <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Full Delivery Address" className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-bold focus:border-accent outline-none" />
              </div>
            </div>

            <div className="p-1 border border-border rounded-[2rem] bg-background mt-4">
              <AnimatePresence>
                {!isFormValid ? (
                  <div className="w-full py-5 text-center text-[10px] font-black uppercase text-foreground/20">Fill form to enable payment</div>
                ) : (
                  <PaystackButton 
                    {...paystackConfig}
                    className="w-full py-5 bg-accent text-white rounded-[1.8rem] font-black uppercase tracking-widest text-xs shadow-xl hover:bg-black transition-all"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right: Summary */}
        <div className="flex flex-col gap-8 md:sticky md:top-32">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-black uppercase italic italic tracking-tight">Your items</h2>
            <div className="bg-surface border border-border rounded-[2rem] p-6 flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="font-bold text-foreground/70">{item.name} <span className="text-[10px] text-foreground/30 ml-1">x{item.quantity}</span></span>
                  <span className="font-black italic">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="h-[1px] bg-border my-2" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-foreground/40">Total</span>
                <span className="text-2xl font-black italic">₦{cartTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
