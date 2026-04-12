import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Fit and Fab | Premium Streetwear",
  description: "Celestial-themed premium streetwear. High-performance, minimalist E-commerce prioritizing brand storytelling and exclusive drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-background text-foreground min-h-screen flex flex-col`}>
        <Header />
        <CartDrawer />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

