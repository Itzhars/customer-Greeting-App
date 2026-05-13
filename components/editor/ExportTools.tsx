"use client";

import { useState } from "react";
import { Download, Share2, Loader2, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadGreetingImage, captureGreetingAsFile } from "@/lib/generateImage";
import { shareGreeting, getWhatsAppShareUrl, getEmailShareUrl } from "@/lib/shareUtils";
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
      <div className="grid grid-cols-2 gap-3">
        <Button 
          size="lg" 
          variant="default"
          className="rounded-2xl h-14 font-bold shadow-lg"
          onClick={handleDownload}
          disabled={isExporting || isSharing}
        >
          {isExporting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Download className="mr-2 h-5 w-5" />
          )}
          Download PNG
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="lg" 
              variant="secondary"
              className="rounded-2xl h-14 font-bold shadow-md bg-white hover:bg-muted"
              disabled={isExporting || isSharing}
            >
              {isSharing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Share2 className="mr-2 h-5 w-5" />
              )}
              Share Card
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
            <DropdownMenuItem 
              onClick={handleNativeShare}
              className="rounded-xl p-3 cursor-pointer"
            >
              <Share2 className="mr-3 h-4 w-4" />
              <span>Native Share (Mobile)</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="rounded-xl p-3 cursor-pointer"
              onClick={() => window.open(getWhatsAppShareUrl(shareText), "_blank")}
            >
              <MessageCircle className="mr-3 h-4 w-4 text-green-500" />
              <span>WhatsApp</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="rounded-xl p-3 cursor-pointer"
              onClick={() => window.open(getEmailShareUrl("Special Greeting for You", shareText), "_blank")}
            >
              <Mail className="mr-3 h-4 w-4 text-red-400" />
              <span>Email</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Generated images are high-resolution 3x PNGs
      </p>
    </div>
  );
}
