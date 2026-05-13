"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Mail, Globe, UserSquare2 } from "lucide-react";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  
  const { loginWithEmail, registerWithEmail, loginWithGoogle, loginAsGuest, isMockMode } = useAuth();
  const router = useRouter();

  const handleAuthAction = async (actionId: string, actionFn: () => Promise<void>) => {
    try {
      setLoadingAction(actionId);
      await actionFn();
      toast.success(isMockMode ? "Logged in (Demo Mode)" : "Successfully authenticated!");
      router.push("/");
    } catch (error: unknown) {
      toast.error((error as Error).message || "Authentication failed. Check your credentials.");
    } finally {
      setLoadingAction(null);
    }
  };

  const onEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isLogin) {
      handleAuthAction("email", () => loginWithEmail(email, password));
    } else {
      handleAuthAction("email", () => registerWithEmail(email, password));
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-card p-8 shadow-2xl border relative overflow-hidden">
      {isMockMode && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl border-l border-b border-amber-500/20">
            Demo Mode
          </div>
        </div>
      )}
      
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to {isLogin ? "sign in to" : "create"} your account
        </p>
      </div>

      <form onSubmit={onEmailSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!loadingAction}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <a href="#" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <Input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!!loadingAction}
            required 
          />
        </div>
        <Button className="w-full" type="submit" disabled={!!loadingAction}>
          {loadingAction === "email" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          {isLogin ? "Sign In with Email" : "Sign Up with Email"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          variant="outline" 
          type="button" 
          className="w-full" 
          onClick={() => handleAuthAction("google", loginWithGoogle)}
          disabled={!!loadingAction}
        >
          {loadingAction === "google" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Globe className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>

        <Button 
          variant="secondary" 
          type="button" 
          className="w-full" 
          onClick={() => handleAuthAction("guest", loginAsGuest)}
          disabled={!!loadingAction}
        >
          {loadingAction === "guest" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UserSquare2 className="mr-2 h-4 w-4" />
          )}
          Continue as Guest
        </Button>
      </div>

      <div className="text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)} 
          className="font-semibold text-primary hover:underline disabled:opacity-50"
          disabled={!!loadingAction}
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
