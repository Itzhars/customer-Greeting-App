"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GreetingTemplate, UserInput } from "@/types";
import { GreetingCanvas } from "@/components/editor/GreetingCanvas";
import { EditorForm } from "@/components/editor/EditorForm";
import { ExportTools } from "@/components/editor/ExportTools";
import { templateService } from "@/lib/services/templateService";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

export default function EditorPage() {
  const { templateId } = useParams();
  const router = useRouter();
  const { isPremium } = useStore();
  const [template, setTemplate] = useState<GreetingTemplate | null>(null);
  const [userInput, setUserInput] = useState<UserInput>({
    senderName: "",
    recipientName: "",
    message: "",
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      const found = await templateService.getTemplateById(templateId as string);
      
      if (!found) {
        toast.error("Template not found");
        router.push("/");
        return;
      }

      if (found.premium && !isPremium) {
        toast.error("Premium Access Required", {
          description: "Please upgrade to use this exclusive template.",
        });
        router.push("/");
        return;
      }

      setTemplate(found);
    };

    fetchTemplate();
  }, [templateId, isPremium, router]);


  if (!template) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-30 w-full border-b bg-background/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold tracking-tight hidden sm:block">{template.name}</h1>
        </div>
        <ExportTools canvasId="greeting-card-canvas" fileName={`${template.name}-greeting`} />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Preview Area */}
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-auto bg-muted/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden bg-white"
          >
            <GreetingCanvas id="greeting-card-canvas" template={template} userInput={userInput} />
          </motion.div>
        </div>

        {/* Editor Sidebar */}
        <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l bg-background p-6 space-y-8 overflow-y-auto">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Personalize</h2>
            <p className="text-sm text-muted-foreground">Make this template your own</p>
          </div>
          
          <EditorForm values={userInput} onChange={setUserInput} />
        </div>
      </div>
    </div>
  );
}
