"use client";

import { motion } from "framer-motion";
import { Crown, Lock } from "lucide-react";
import { GreetingTemplate } from "@/types";
import { useStore } from "@/store/useStore";
import { GreetingOverlay } from "@/components/editor/GreetingOverlay";
import { useMounted } from "@/lib/hooks/useMounted";

interface TemplateCardProps {
  template: GreetingTemplate;
  onSelect?: (template: GreetingTemplate) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const mounted = useMounted();
  const { username, avatarUrl, isPremium } = useStore();
  
  const showLock = template.premium && mounted && !isPremium;

  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="group relative overflow-hidden rounded-[32px] border bg-card shadow-sm transition-all duration-500 hover:premium-shadow-hover cursor-pointer shimmer-sweep"
      onClick={() => onSelect?.(template)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Personalized Live Preview Overlay */}
        <GreetingOverlay 
          template={template} 
          username={username} 
          avatarUrl={avatarUrl} 
          isThumbnail={true}
        />

        {/* Premium Badge */}
        {template.premium && (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 px-3 py-1.5 text-[10px] font-black text-white shadow-xl border border-white/20">
            <Crown className="h-3 w-3" />
            PRO
          </div>
        )}

        {/* Premium Blur Overlay & Lock Icon */}
        {showLock && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-[3px] transition-all duration-500">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white shadow-3xl backdrop-blur-md border border-white/30 transform transition-transform group-hover:scale-110">
              <Lock className="h-7 w-7" />
            </div>
          </div>
        )}

        {/* Dynamic Shadow Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-20 transition-opacity group-hover:opacity-100" />

        {/* Metadata Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white z-30 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            {template.category}
          </p>
          <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tighter drop-shadow-2xl">
            {template.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
