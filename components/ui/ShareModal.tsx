"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Check, 
  Share2, 
  Twitter, 
  Facebook, 
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this greeting I created!`, "_blank");
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent("Check out this greeting I created: " + shareUrl)}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-950 border-white/10 text-white rounded-[32px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic tracking-tight">Share Your Masterpiece</DialogTitle>
          <DialogDescription className="text-slate-400">
            Anyone with this link can view your personalized greeting.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 py-4">
          <div className="grid flex-1 gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="bg-white/5 border-white/10 text-white rounded-xl h-12"
            />
          </div>
          <Button 
            onClick={handleCopy}
            size="icon" 
            className="rounded-xl h-12 w-12 bg-primary hover:bg-primary/90 text-white"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          <Button 
            variant="outline" 
            onClick={shareToTwitter}
            className="flex flex-col h-20 gap-2 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
          >
            <Twitter className="h-6 w-6 text-sky-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Twitter</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={shareToWhatsApp}
            className="flex flex-col h-20 gap-2 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
          >
            <MessageCircle className="h-6 w-6 text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open(shareUrl, "_blank")}
            className="flex flex-col h-20 gap-2 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
          >
            <ExternalLink className="h-6 w-6 text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Preview</span>
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="rounded-xl bg-white/10 text-white hover:bg-white/20 border-none"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
