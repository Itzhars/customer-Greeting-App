"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "Birthday",
  "Anniversary",
  "Festivals",
  "Shayari",
  "Love",
  "Motivation",
];

interface CategoryChipsProps {
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({ active, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar px-1">
      {CATEGORIES.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              "relative px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95",
              isActive 
                ? "text-white" 
                : "text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-primary shadow-lg shadow-primary/25 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
