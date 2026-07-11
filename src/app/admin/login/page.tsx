"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-outline/20 ambient-shadow">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
            P
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-sm text-secondary mt-1">Sign in to manage your portfolio</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm text-center border border-danger/20">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="admin@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline/20 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full font-medium" isDisabled={isLoading}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
