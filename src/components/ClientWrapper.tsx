"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && children}
    </>
  );
}
