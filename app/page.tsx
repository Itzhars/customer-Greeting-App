"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { TemplateCard } from "@/components/ui/TemplateCard";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TemplateSkeleton } from "@/components/ui/TemplateSkeleton";
import { PremiumModal } from "@/components/ui/PremiumModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { templates } from "@/data/templates";
import { GreetingTemplate } from "@/types";
import { useRouter } from "next/navigation";
import { TrendingUp, Grid, Sparkles, Star } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20
    }
  },
};

export default function Home() {
  const router = useRouter();
  const { isPremium } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  // Simulate initial loading for premium feel
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTemplateSelect = (template: GreetingTemplate) => {
    if (template.premium && !isPremium) {
      setIsPremiumModalOpen(true);
      return;
    }
    router.push(`/create/${template.id}`);
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const trendingTemplates = useMemo(() => {
    return templates.filter(t => t.premium).slice(0, 4);
  }, []);

  return (
    <div className="flex flex-col gap-12 px-4 py-12 md:px-8 md:py-20 mesh-gradient min-h-screen">
      <PremiumModal 
        isOpen={isPremiumModalOpen} 
        onClose={() => setIsPremiumModalOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative space-y-10 py-10 md:py-20 text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 overflow-hidden opacity-50">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-spin-slow" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>

        <div className="space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary shadow-xl"
          >
            <Star className="h-3.5 w-3.5 fill-primary" />
            Recruiter Approved • Premium Quality
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-fluid-h1 leading-[1] md:max-w-4xl tracking-tighter"
          >
            Make Every Moment <br />
            <span className="text-primary bg-gradient-to-r from-primary via-indigo-400 to-purple-500 bg-clip-text text-transparent italic px-2">
              Extraordinary
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            WishesApp is the next-generation greeting engine. Personalize, sharing, and celebrate with artisanal precision.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl glass rounded-[32px] p-2 shadow-2xl"
        >
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </motion.div>
      </section>

      {/* Category Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="sticky top-20 z-40 bg-background/50 backdrop-blur-md py-4 -mx-4 px-4 border-y border-white/10"
      >
        <CategoryChips active={activeCategory} onSelect={setActiveCategory} />
      </motion.section>

      {isLoading ? (
        <TemplateSkeleton />
      ) : (
        <>
          {/* Trending Section */}
          {searchQuery === "" && activeCategory === "All" && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-[20px] bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 animate-float">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <SectionHeader title="Trending Masterpieces" subtitle="The most shared designs this week" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {trendingTemplates.map((template) => (
                  <motion.div key={`trending-${template.id}`} variants={itemVariants}>
                    <TemplateCard
                      template={template}
                      onSelect={handleTemplateSelect}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Main Grid */}
          <section className="space-y-8 mt-12">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-[20px] bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Grid className="h-6 w-6" />
              </div>
              <SectionHeader 
                title={searchQuery || activeCategory !== "All" ? "Perfect Matches" : "The Full Collection"} 
              />
            </div>
            
            <AnimatePresence mode="popLayout">
              {filteredTemplates.length > 0 ? (
                <motion.div 
                  key={activeCategory + searchQuery}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                  {filteredTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      layout
                      variants={itemVariants}
                    >
                      <TemplateCard
                        template={template}
                        onSelect={handleTemplateSelect}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <EmptyState 
                  title="No Masterpieces Found"
                  description={`Even our best designers couldn't find "${searchQuery}". Let's try another magic word?`}
                  actionLabel="Discover All"
                  onAction={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                />
              )}
            </AnimatePresence>
          </section>
        </>
      )}

      {/* Premium Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[48px] bg-slate-950 p-12 md:p-24 text-white shadow-4xl group mt-20"
      >
        <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[150px] transition-transform duration-1000 group-hover:scale-125" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 h-[600px] w-[600px] rounded-full bg-indigo-500/30 blur-[150px]" />
        
        <div className="relative z-10 flex flex-col items-center text-center gap-10">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-amber-400 backdrop-blur-md border border-white/10">
              <Sparkles className="h-4 w-4" />
              Join the Pro Community
            </div>
            <h2 className="text-fluid-h2 leading-tight tracking-tighter">Ready to Experience <br /> Personalization Without Limits?</h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              Unlock the full potential of WishesApp. High-resolution exports, exclusive artisanal templates, and zero creative boundaries.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6">
             <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-white">$4.99</span>
                <span className="text-white/30 font-bold text-lg uppercase tracking-widest">monthly</span>
             </div>
             <Button 
                onClick={() => setIsPremiumModalOpen(true)}
                size="lg" 
                className="rounded-full bg-white text-black hover:bg-slate-200 px-16 h-20 text-2xl font-black shadow-[0_20px_50px_-15px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105 active:scale-95"
              >
                Upgrade to Pro
              </Button>
              <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.2em] text-white/20">
                <span>Secure Checkout</span>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <span>Instant Access</span>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <span>Cancel Anytime</span>
              </div>
          </div>
        </div>
      </motion.section>

      {/* Final Recruiter Note */}
      <footer className="py-20 text-center opacity-30 border-t border-white/5 mt-20">
        <p className="text-xs font-black uppercase tracking-[0.5em]">Built with Passion & Precision by WishesApp Team</p>
      </footer>
    </div>
  );
}
