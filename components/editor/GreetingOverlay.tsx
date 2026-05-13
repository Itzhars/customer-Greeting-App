"use client";

import { GreetingTemplate } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/hooks/useMounted";

interface GreetingOverlayProps {
  template: GreetingTemplate;
  username: string;
  avatarUrl: string | null;
  isThumbnail?: boolean; // If true, scales down for the grid view
  customMessage?: string;
}

export function GreetingOverlay({ 
  template, 
  username, 
  avatarUrl, 
  isThumbnail = false,
  customMessage
}: GreetingOverlayProps) {
  const mounted = useMounted();
  
  // Prevent hydration mismatch by using stable defaults until mounted
  const displayUsername = mounted ? (username || "Recipient") : "Recipient";
  const displayAvatar = mounted ? avatarUrl : null;
  
  const textPosClasses = {
    "top": "justify-start pt-[15%]",
    "center": "justify-center",
    "bottom": "justify-end pb-[15%]",
    "top-left": "justify-start items-start p-[10%]",
    "top-right": "justify-start items-end p-[10%]",
    "bottom-left": "justify-end items-start p-[10%]",
    "bottom-right": "justify-end items-end p-[10%]",
  };

  const profilePosClasses = {
    "top-right": "top-[5%] right-[5%]",
    "bottom-right": "bottom-[5%] right-[5%]",
    "top-left": "top-[5%] left-[5%]",
    "bottom-left": "bottom-[5%] left-[5%]",
    "center-bottom": "bottom-[10%] left-1/2 -translate-x-1/2",
    "none": "hidden",
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col pointer-events-none p-[5%]">
      {/* Dynamic Text Overlay */}
      <div className={cn(
        "flex flex-col w-full h-full transition-all duration-500",
        textPosClasses[template.textPosition as keyof typeof textPosClasses] || textPosClasses.center
      )}>
        <motion.div 
          initial={false}
          animate={{ scale: isThumbnail ? 0.6 : 1 }}
          className="text-center space-y-1 drop-shadow-2xl"
        >
          <p className={cn(
            "font-bold uppercase tracking-widest text-white/50",
            isThumbnail ? "text-[8px]" : "text-xs"
          )}>
            Dear
          </p>
          <h2 className={cn(
            "font-black italic text-white leading-tight",
            isThumbnail ? "text-lg" : "text-4xl md:text-5xl"
          )}>
            {displayUsername}
          </h2>
          
          {!isThumbnail && customMessage && (
            <div className="max-w-[80%] mx-auto py-4 border-y border-white/20 mt-4 backdrop-blur-sm bg-black/10 rounded-xl px-6">
              <p className="text-lg md:text-xl font-medium leading-relaxed italic text-white">
                &ldquo;{customMessage}&rdquo;
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Dynamic Profile Overlay */}
      {template.profilePosition !== "none" && displayAvatar && (
        <div className={cn(
          "absolute overflow-hidden rounded-full border-2 border-white/80 shadow-2xl transition-all duration-500",
          isThumbnail ? "h-10 w-10" : "h-20 w-20 md:h-24 md:w-24",
          profilePosClasses[template.profilePosition as keyof typeof profilePosClasses]
        )}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={displayAvatar} 
            alt={`${displayUsername}'s profile picture`} 
            className="h-full w-full object-cover" 
          />
        </div>
      )}

      {/* Brand Watermark for exports */}
      {!isThumbnail && (
        <div className="absolute bottom-4 right-4 opacity-30 text-[10px] font-bold tracking-widest uppercase text-white">
          WishesApp
        </div>
      )}
    </div>
  );
}
