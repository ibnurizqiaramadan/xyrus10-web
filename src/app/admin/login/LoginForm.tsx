"use client";

import { useState } from "react";
import { login } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" required className="bg-white/5 border-white/10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required className="bg-white/5 border-white/10" />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-[#2b7fff] hover:bg-[#2b7fff]/90">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
