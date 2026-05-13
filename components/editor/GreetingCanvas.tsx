"use client";

import { GreetingTemplate, UserInput } from "@/types";
import { cn } from "@/lib/utils";
import { GreetingOverlay } from "./GreetingOverlay";
import { useStore } from "@/store/useStore";

interface GreetingCanvasProps {
  id: string;
  template: GreetingTemplate;
  userInput: UserInput;
}

export function GreetingCanvas({ id, template, userInput }: GreetingCanvasProps) {
  const { avatarUrl } = useStore();
  
  const isBirthday = template.category === "Birthday";
  const isAnniversary = template.category === "Anniversary";
  const isWedding = template.category === "Wedding";
  const isFestivals = template.category === "Festivals";
  const isMotivation = template.category === "Motivation";

  return (
    <div
      id={id}
      className={cn(
        "aspect-[4/5] w-full relative overflow-hidden flex flex-col",
        isBirthday && "bg-gradient-to-br from-yellow-100 to-orange-200",
        isAnniversary && "bg-gradient-to-br from-rose-100 to-pink-200",
        isWedding && "bg-gradient-to-br from-slate-50 to-indigo-100",
        isFestivals && "bg-gradient-to-br from-red-50 to-orange-100",
        isMotivation && "bg-gradient-to-br from-blue-900 to-slate-800",
        !isBirthday && !isAnniversary && !isWedding && !isFestivals && !isMotivation && "bg-gradient-to-br from-blue-50 to-indigo-50"
      )}
    >
      {/* Dynamic Background Image if available */}
      {template.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={template.thumbnailUrl} 
          alt={template.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      )}

      {/* Decorative Canvas Backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full border-[10px] border-white/30 blur-sm" />
        <div className="absolute bottom-[10%] right-[10%] w-48 h-48 rounded-full bg-white/10 blur-xl" />
      </div>

      {/* The Central Personalization Engine */}
      <GreetingOverlay 
        template={template}
        username={userInput.recipientName || "Recipient"}
        avatarUrl={avatarUrl}
        customMessage={userInput.message}
      />
    </div>
  );
}
