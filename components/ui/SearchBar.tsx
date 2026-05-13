"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center w-full rounded-2xl bg-muted/50 px-4 py-3 transition-all",
        isFocused ? "ring-2 ring-primary bg-background shadow-md" : "hover:bg-muted"
      )}
    >
      <Search className={cn("h-5 w-5 transition-colors", isFocused ? "text-primary" : "text-muted-foreground")} />
      <input
        type="text"
        placeholder="Search for templates, categories..."
        className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
