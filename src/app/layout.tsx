import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieConsent from "@/components/ui/CookieConsent";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppSupport from "@/components/ui/WhatsAppSupport";
import { Toast } from "@/components/shared/Toast";
import LiveActivity from "@/components/LiveActivity";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Fit and Fab | Premium Streetwear Drop",
  description: "Made to Fit. Made to Stand Out. Exclusive premium streetwear drop including the Archive Hoodie and the Vault collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceMono.variable} font-sans bg-background text-foreground min-h-screen flex flex-col`}>
        <Header />
        <CartDrawer />
        <CookieConsent />
        <NewsletterPopup />
        <CustomCursor />
        <WhatsAppSupport />
        <Toast />
        <LiveActivity />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

