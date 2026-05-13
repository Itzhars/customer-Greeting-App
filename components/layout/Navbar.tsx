"use client";

import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/store/useStore";
import { LogIn, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/useMounted";

export function Navbar() {
  const mounted = useMounted();
  const { user } = useAuth();
  const { username, avatarUrl } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayUsername = mounted ? username : "Guest User";
  const displayAvatar = mounted ? avatarUrl : null;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4",
        isScrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg border-b shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="WishesApp Home">
          <div className="bg-primary rounded-xl p-1.5 transition-transform group-hover:scale-110 group-active:scale-95 shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">
            Wishes<span className="text-primary">App</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <Link 
              href="/profile" 
              className="flex items-center gap-3 bg-muted/50 hover:bg-muted p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-border group"
              aria-label={`Go to ${displayUsername}'s profile`}
            >
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                {displayAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayAvatar} alt={displayUsername} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold uppercase">
                    {displayUsername?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:block truncate max-w-[100px]">
                {displayUsername || "Profile"}
              </span>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-full font-bold">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
