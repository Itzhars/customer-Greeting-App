"use client";

import { useState } from "react";
import { Download, Share2, Loader2, MessageCircle, Mail, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadGreetingImage, captureGreetingAsFile } from "@/lib/generateImage";
import { shareGreeting, getWhatsAppShareUrl, getEmailShareUrl } from "@/lib/shareUtils";
import { storageService } from "@/lib/services/storageService";
import { ShareModal } from "@/components/ui/ShareModal";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ExportToolsProps {
  canvasId: string;
  fileName: string;
}

export function ExportTools({ canvasId, fileName }: ExportToolsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await downloadGreetingImage(canvasId, fileName);
      toast.success("Greeting Card downloaded in High Quality!");
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to download greeting card");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCreateShareLink = async () => {
    try {
      setIsCreatingLink(true);
      const file = await captureGreetingAsFile(canvasId, fileName);
      const storageUrl = await storageService.uploadGreeting(file, fileName);
      const baseUrl = window.location.origin;
      const finalShareUrl = `${baseUrl}/v/view?url=${encodeURIComponent(storageUrl)}`;
      setShareUrl(finalShareUrl);
      setIsShareModalOpen(true);
      toast.success("Share link created successfully!");

    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to create share link");
    } finally {
      setIsCreatingLink(false);
    }
  };

  const handleNativeShare = async () => {
    try {
      setIsSharing(true);
      const file = await captureGreetingAsFile(canvasId, fileName);
      await shareGreeting(
        file, 
        "My Custom Greeting", 
        "Check out this greeting card I created with WishesApp!"
      );
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (message.includes("not supported")) {
        toast.info("Native sharing is best on mobile. Use the options below!");
      } else {
        toast.error(message || "Failed to share greeting card");
      }
    } finally {
      setIsSharing(false);
    }
  };

  const shareText = "Check out this beautiful greeting card I made for you! 🌟";

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        shareUrl={shareUrl || ""} 
      />

      <div className="grid grid-cols-1 gap-3">
        <Button 
          size="lg" 
          variant="default"
          className="rounded-2xl h-14 font-black shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] bg-primary text-white hover:bg-primary/90"
          onClick={handleCreateShareLink}
          disabled={isCreatingLink || isExporting || isSharing}
        >
          {isCreatingLink ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <LinkIcon className="mr-2 h-5 w-5" />
          )}
          {isCreatingLink ? "Generating Link..." : "Create Shareable Link"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          size="lg" 
          variant="outline"
          className="rounded-2xl h-14 font-bold border-white/10 bg-white/5 hover:bg-white/10"
          onClick={handleDownload}
          disabled={isExporting || isSharing || isCreatingLink}
        >
          {isExporting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Download className="mr-2 h-5 w-5" />
          )}
          Download
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-2xl h-14 font-bold border-white/10 bg-white/5 hover:bg-white/10"
              disabled={isExporting || isSharing || isCreatingLink}
            >
              {isSharing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Share2 className="mr-2 h-5 w-5" />
              )}
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-slate-950 border-white/10 text-white">
            <DropdownMenuItem 
              onClick={handleNativeShare}
              className="rounded-xl p-3 cursor-pointer hover:bg-white/10 focus:bg-white/10"
            >
              <Share2 className="mr-3 h-4 w-4" />
              <span>Native Share (Mobile)</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="rounded-xl p-3 cursor-pointer hover:bg-white/10 focus:bg-white/10"
              onClick={() => window.open(getWhatsAppShareUrl(shareText), "_blank")}
            >
              <MessageCircle className="mr-3 h-4 w-4 text-green-500" />
              <span>WhatsApp</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="rounded-xl p-3 cursor-pointer hover:bg-white/10 focus:bg-white/10"
              onClick={() => window.open(getEmailShareUrl("Special Greeting for You", shareText), "_blank")}
            >
              <Mail className="mr-3 h-4 w-4 text-red-400" />
              <span>Email</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
        3X High-Res Retina Export Engine
      </p>
    </div>
  );
}

