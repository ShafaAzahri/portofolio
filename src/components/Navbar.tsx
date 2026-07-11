"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline/20 shadow-sm transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            P
          </div>
          <span className="font-bold text-primary text-lg">Prabaswara</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-foreground hover:text-primary transition-colors py-2 px-1 text-sm font-medium">
            About
          </Link>
          <Link href="#projects" className="text-primary font-bold border-b-2 border-primary py-2 px-1 text-sm transition-all duration-300 ease-in-out">
            Projects
          </Link>
          <Link href="#tech-stack" className="text-foreground hover:text-primary transition-colors py-2 px-1 text-sm font-medium">
            Tech Stack
          </Link>
          <Link href="#certifications" className="text-foreground hover:text-primary transition-colors py-2 px-1 text-sm font-medium">
            Certifications
          </Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition-colors py-2 px-1 text-sm font-medium">
            Contact
          </Link>
        </div>

        <Button 
          variant="primary" 
          className="font-medium"
          render={(props) => (
            <a 
              {...(props as Record<string, unknown>)} 
              href="https://drive.google.com/file/d/1zR_DHnFhX9uCBPCxbiudyjFPqkQkYI7D/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer" 
            />
          )}
        >
          Resume
        </Button>
      </div>
    </nav>
  );
}
