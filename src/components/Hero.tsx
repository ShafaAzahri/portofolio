"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

interface HeroProfile {
  name?: string;
  headline?: string;
  shortBio?: string;
  heroTerminal1?: string;
  heroTerminal2?: string;
  heroTerminal3?: string;
}

export default function Hero({ profile, projectCount, certificateCount }: { profile: HeroProfile, projectCount: number, certificateCount: number }) {
  const [typing1, setTyping1] = useState("");
  const [typing2, setTyping2] = useState("");
  const [typing3, setTyping3] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = profile?.heroTerminal1 || "Prabaswara Shafa Azarioma";
    const t2 = profile?.heroTerminal2 || "Backend Developer | Quality Assurance Engineer";
    const t3 = profile?.heroTerminal3 || "Tech: PHP, Laravel, Python, MySQL, Katalon, k6";

    let i = 0;
    if (step === 0) {
      const timer = setInterval(() => {
        setTyping1(t1.slice(0, i));
        i++;
        if (i > t1.length) {
          clearInterval(timer);
          setTyping1(t1);
          setTimeout(() => setStep(1), 300);
        }
      }, 50);
      return () => clearInterval(timer);
    } else if (step === 1) {
      const timer = setInterval(() => {
        setTyping2(t2.slice(0, i));
        i++;
        if (i > t2.length) {
          clearInterval(timer);
          setTyping2(t2);
          setTimeout(() => setStep(2), 300);
        }
      }, 30);
      return () => clearInterval(timer);
    } else if (step === 2) {
      const timer = setInterval(() => {
        setTyping3(t3.slice(0, i));
        i++;
        if (i > t3.length) {
          clearInterval(timer);
          setTyping3(t3);
          setTimeout(() => setStep(3), 300);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [step, profile?.heroTerminal1, profile?.heroTerminal2, profile?.heroTerminal3]);

  return (
    <section id="hero" className="relative min-h-[75vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left: Content & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 space-y-6 text-center md:text-left mt-10 md:mt-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs text-secondary">Available for new opportunities</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            {profile?.name || "Prabaswara Shafa Azarioma"}
          </h1>

          <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 max-w-2xl">
            {profile?.headline || "Backend Developer & Quality Assurance Specialist"}
          </h2>

          <p className="text-lg text-secondary max-w-xl mx-auto md:mx-0">
            {profile?.shortBio || "Focused on developing reliable backend systems and ensuring software quality through robust, automated testing methodologies."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
            <Button onPress={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} variant="primary" size="lg" className="w-full sm:w-auto font-medium">
              View Projects
            </Button>
            <Button onPress={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} variant="outline" size="lg" className="w-full sm:w-auto font-medium">
              Contact Me
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-outline/20">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-3xl font-bold text-foreground">{projectCount > 0 ? projectCount : "0"}{projectCount > 0 && <span className="text-primary">+</span>}</div>
              <span className="text-sm text-secondary">Projects</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-3xl font-bold text-foreground">{certificateCount > 0 ? certificateCount : "0"}{certificateCount > 0 && <span className="text-primary">+</span>}</div>
              <span className="text-sm text-secondary">Certificates</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl font-bold text-foreground mt-1">Software</div>
              <span className="text-sm text-secondary">Developer</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl font-bold text-foreground mt-1">QA</div>
              <span className="text-sm text-secondary">Enthusiast</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 flex justify-center md:justify-end w-full"
        >
          <div className="relative w-full max-w-[450px] rounded-2xl overflow-hidden border border-outline/20 bg-surface-container-high font-mono text-sm shadow-2xl flex flex-col">
            {/* Window Header */}
            <div className="bg-surface-container border-b border-outline/20 p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-xs text-secondary opacity-70">bash - ~</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-4 text-foreground/80 min-h-[220px]">
              <div>
                <span className="text-primary font-bold mr-2">$</span>
                <span>whoami</span>
                {step >= 1 && <div className="mt-1 text-primary">{typing1}</div>}
              </div>

              {step >= 1 && (
                <div>
                  <span className="text-primary font-bold mr-2">$</span>
                  <span>cat info.txt</span>
                  {step >= 2 && <div className="mt-1 text-secondary">{typing2}</div>}
                </div>
              )}

              {step >= 2 && (
                <div>
                  <span className="text-primary font-bold mr-2">$</span>
                  <span>ls -l skills/</span>
                  {step >= 3 && <div className="mt-1 text-secondary">{typing3}</div>}
                </div>
              )}

              <div className="animate-pulse text-primary font-bold">_</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
