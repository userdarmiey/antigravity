"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mousePosition.x - 16, springConfig);
  const cursorY = useSpring(mousePosition.y - 16, springConfig);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
        }}
        className="fixed w-8 h-8 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md pointer-events-none z-[10000] mix-blend-difference"
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
        }}
        className="fixed w-8 h-8 flex items-center justify-center pointer-events-none z-[10001] mix-blend-difference"
      >
         <div className="w-1 h-1 bg-accent rounded-full" />
      </motion.div>
    </>
  );
}
