"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LaunchCountdown() {
  // Target date: Roughly 5 months from April 2026 -> September 19, 2026
  const targetDate = new Date('2026-09-19T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  // To prevent hydration mismatch, don't render the numbers until after mount
  if (!mounted) {
    return <div className="w-full h-[400px] bg-background border-t border-b border-border" />;
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="w-full py-24 md:py-32 bg-background flex flex-col items-center justify-center relative border-t border-b border-border overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/10 blur-[140px] rounded-[100%] pointer-events-none" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-12 px-2"
      >
        <div className="flex flex-col items-center gap-4 text-center">
           <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]" />
              <span className="text-[12px] uppercase font-bold tracking-[0.2em] text-accent">Get Ready!</span>
           </div>
           <h3 className="text-2xl md:text-4xl text-foreground font-black uppercase tracking-[0.1em] italic mt-4">We are launching in</h3>
        </div>

        <div className="flex gap-4 md:gap-8 justify-center items-center">
          {timeBlocks.map((block, idx) => (
            <React.Fragment key={block.label}>
              <div className="flex flex-col items-center gap-1 min-w-[50px] md:min-w-[90px]">
                <div className="w-full flex items-center justify-center relative group">
                  <span className="text-4xl md:text-6xl lg:text-8xl font-mono font-black tabular-nums tracking-tighter text-accent drop-shadow-[0_0_12px_var(--accent)] relative z-10">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-foreground/60">{block.label}</span>
              </div>
              
              {idx < timeBlocks.length - 1 && (
                <div className="flex flex-col items-center justify-center gap-2 md:gap-4 pb-4 md:pb-6">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground/20" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground/20" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
