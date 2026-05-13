"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Check, Star, Zap, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const { setPremium } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setPremium(true);
    setIsProcessing(false);
    toast.success("Welcome to Wishes Pro!", {
      description: "All premium templates are now unlocked.",
    });
    onClose();
  };

  const features = [
    { icon: <Crown className="h-4 w-4" />, text: "Unlock 50+ Exclusive Templates" },
    { icon: <Zap className="h-4 w-4" />, text: "3x Retina High-Resolution Exports" },
    { icon: <Star className="h-4 w-4" />, text: "Ad-Free Experience" },
    { icon: <Check className="h-4 w-4" />, text: "Priority Customer Support" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-gradient-to-b from-slate-900 to-black p-8 text-white shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 shadow-xl shadow-amber-600/20">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black tracking-tight">Wishes <span className="text-amber-500">PRO</span></h2>
              <p className="text-slate-400">Elevate your greetings with professional tools and designs.</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Pricing Card */}
            <div className="rounded-3xl bg-amber-500 p-6 text-black mb-8 shadow-lg shadow-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-widest opacity-70">Best Value</span>
                <span className="rounded-full bg-black text-white px-3 py-1 text-[10px] font-bold">SAVED 40%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">$4.99</span>
                <span className="text-sm font-bold opacity-70">/ month</span>
              </div>
              <p className="text-xs font-medium mt-2 opacity-80">Full access to everything. Cancel anytime.</p>
            </div>

            {/* CTA */}
            <Button
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="w-full h-16 rounded-2xl bg-white text-black hover:bg-slate-200 text-lg font-black transition-all transform active:scale-95 shadow-xl"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Upgrade Now"
              )}
            </Button>
            
            <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold">
              Secure checkout • Instant Activation
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
