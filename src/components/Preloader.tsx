"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const fullText = "Initializing system...";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground"
    >
      <div className="flex flex-col items-start font-mono text-sm max-w-sm w-full p-4 border border-outline/20 rounded-xl bg-surface-container-low shadow-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-outline/20 w-full">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-secondary opacity-70">bash - startup</span>
        </div>
        <div className="flex">
          <span className="text-primary font-bold mr-2">$</span>
          <span>{text}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-primary ml-1 translate-y-[2px]"
          />
        </div>
      </div>
    </motion.div>
  );
}
