"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileData {
  aboutTitle?: string;
  aboutDescription?: string;
  location?: string;
  focus?: string;
}

export default function About({ profile }: { profile?: ProfileData }) {
  const tabs = [
    { id: "bio", label: "Profil" },
    { id: "focus", label: "Fokus" },
    { id: "background", label: "Latar Belakang" }
  ];
  const [activeTab, setActiveTab] = useState("bio");

  return (
    <section id="about" className="py-24 relative z-10 bg-background overflow-hidden">
      {/* Background Decorative Glows to make it not simple */}
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Large prominent section title */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">About Me</h2>
            <div className="h-[2px] w-24 md:w-48 bg-primary mt-2"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Complex Rich Text Block (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Tabs Selector */}
            <div className="flex border-b border-outline/10 gap-6 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? "text-primary font-bold cursor-pointer"
                      : "text-secondary hover:text-foreground cursor-pointer"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Panel */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {activeTab === "bio" && (
                    <p className="text-2xl md:text-3xl text-foreground font-semibold leading-snug">
                      {profile?.aboutTitle || "Computer Engineering student with experience in backend development, database management, and software application development."}
                    </p>
                  )}
                  
                  {activeTab === "focus" && (
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"></div>
                      <p className="text-lg md:text-xl text-secondary leading-relaxed whitespace-pre-line">
                        {profile?.aboutDescription || "Familiar with software testing, API validation, debugging, and defect identification.\n\nExperienced in working with PHP, MySQL, Flutter, and Python. Interested in Software Quality Assurance and passionate about ensuring software quality through systematic testing and problem-solving."}
                      </p>
                    </div>
                  )}

                  {activeTab === "background" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="bg-surface-container-low border border-outline/20 p-4 rounded-2xl flex flex-col justify-center shadow-sm hover:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-primary mb-2">code</span>
                        <span className="text-xs text-secondary font-mono uppercase mb-1">Role</span>
                        <span className="font-bold text-foreground text-sm">Backend Dev</span>
                      </div>
                      <div className="bg-surface-container-low border border-outline/20 p-4 rounded-2xl flex flex-col justify-center shadow-sm hover:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-primary mb-2">bug_report</span>
                        <span className="text-xs text-secondary font-mono uppercase mb-1">Interest</span>
                        <span className="font-bold text-foreground text-sm">QA Engineer</span>
                      </div>
                      <div className="bg-surface-container-low border border-outline/20 p-4 rounded-2xl flex flex-col justify-center shadow-sm hover:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-primary mb-2">location_on</span>
                        <span className="text-xs text-secondary font-mono uppercase mb-1">Base</span>
                        <span className="font-bold text-foreground text-sm">{profile?.location || "Semarang, ID"}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Right: Complex Visual Element (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative layered cards to make it NOT simple */}
            <div className="relative w-full aspect-square md:aspect-[4/5]">
              {/* Back Card */}
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-6 transform transition-transform duration-500 hover:rotate-12 blur-[1px]"></div>
              
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-2 border-outline/20 bg-surface shadow-2xl z-10 group">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[gradient_3s_linear_infinite] z-20 pointer-events-none"></div>
                
                {/* Replace src with your own photo later */}
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                  alt="Workspace" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Glassmorphic Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-30">
                  <div className="backdrop-blur-md bg-surface/40 border border-outline/30 rounded-2xl p-4 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <span className="material-symbols-outlined text-sm">verified</span>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-foreground">Open to Work</p>
                        <p className="text-xs text-secondary">{profile?.focus || "Backend & QA Opportunities"}</p>
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Floating tech elements */}
              <div className="absolute -left-6 top-20 z-40 bg-surface backdrop-blur-xl border border-outline/20 p-3 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="material-symbols-outlined text-primary">data_object</span>
              </div>
              <div className="absolute -right-6 top-1/3 z-40 bg-surface backdrop-blur-xl border border-outline/20 p-3 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <span className="material-symbols-outlined text-secondary">terminal</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
