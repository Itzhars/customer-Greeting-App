"use client";

import { motion } from "framer-motion";
import { SearchX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center bg-muted/20 rounded-[32px] border-2 border-dashed border-muted/50"
    >
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
          <SearchX className="h-10 w-10" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center text-white shadow-lg"
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-black tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-[300px] mb-8 leading-relaxed">
        {description}
      </p>
      
      {actionLabel && (
        <Button onClick={onAction} variant="outline" className="rounded-full px-8">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
