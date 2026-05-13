"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Download, Share2 } from "lucide-react";
import { Suspense } from "react";

function ViewingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <h1 className="text-4xl font-black italic text-white mb-4">Masterpiece Not Found</h1>
        <p className="text-slate-400 mb-8">The link might be broken or expired.</p>
        <Button onClick={() => router.push("/")} className="rounded-full px-8">
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient-dark flex flex-col items-center justify-center p-4 md:p-8">
      {/* Branded Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col items-center gap-4 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary shadow-xl">
          <Sparkles className="h-4 w-4" />
          A Special Gift For You
        </div>
        <h1 className="text-fluid-h2 font-black italic text-white tracking-tighter">WishesApp Masterpiece</h1>
      </motion.div>

      {/* The Greeting Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-lg aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 glow-pulse"
      >

        <div className="absolute inset-0 bg-white/5 animate-pulse" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={decodeURIComponent(imageUrl)} 
          alt="Personalized Greeting" 
          className="relative z-10 w-full h-full object-cover"
        />
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 flex flex-col items-center gap-8 w-full max-w-md"
      >
        <div className="flex gap-4 w-full">
           <Button 
            variant="outline" 
            className="flex-1 rounded-2xl h-16 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold"
            onClick={() => window.open(decodeURIComponent(imageUrl), "_blank")}
           >
             <Download className="mr-2 h-5 w-5" />
             Download
           </Button>
           <Button 
            variant="outline" 
            className="flex-1 rounded-2xl h-16 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold"
            onClick={() => {
               navigator.clipboard.writeText(window.location.href);
               alert("Link copied!");
            }}
           >
             <Share2 className="mr-2 h-5 w-5" />
             Re-share
           </Button>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="space-y-6 text-center">
          <p className="text-white/50 font-medium">Want to create something extraordinary like this?</p>
          <Button 
            size="lg"
            className="rounded-full bg-white text-black hover:bg-slate-200 px-12 h-16 text-xl font-black shadow-[0_20px_50px_-15px_rgba(255,255,255,0.3)] group"
            onClick={() => router.push("/")}
          >
            Create Your Own
            <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Button>
        </div>
      </motion.div>

      {/* Footer Watermark */}
      <footer className="mt-20 opacity-20 text-[10px] font-black uppercase tracking-[0.5em] text-white">
        Powered by WishesApp Precision Engine
      </footer>
    </div>
  );
}

export default function ViewingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Loading Masterpiece...</div>}>
      <ViewingPageContent />
    </Suspense>
  );
}
