"use client";

import { motion } from "framer-motion";

interface ContactProfile {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function Contact({ profile }: { profile?: ContactProfile }) {
  return (
    <section id="contact" className="py-20 relative z-10 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline/20 ambient-shadow"
        >
          <div className="text-center mb-10 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">Let&apos;s Connect</h3>
            <p className="text-secondary max-w-2xl mx-auto">
              I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 bg-surface px-6 py-4 rounded-2xl border border-outline/20 ambient-shadow">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-secondary font-mono uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${profile?.email || "hello@example.com"}`} className="text-foreground font-medium hover:text-primary transition-colors text-lg">
                  {profile?.email || "hello@example.com"}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-surface px-6 py-4 rounded-2xl border border-outline/20 ambient-shadow">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">link</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-secondary font-mono uppercase tracking-wider mb-1">Socials</p>
                <div className="flex gap-3 mt-1">
                  {profile?.linkedinUrl && (
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-surface-container-high hover:bg-primary hover:text-primary-foreground border border-outline/20 rounded-xl font-medium transition-colors text-sm flex items-center gap-2">
                      LinkedIn
                    </a>
                  )}
                  {profile?.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-surface-container-high hover:bg-primary hover:text-primary-foreground border border-outline/20 rounded-xl font-medium transition-colors text-sm flex items-center gap-2">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
