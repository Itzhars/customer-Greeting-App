"use client";

import { UserInput } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, MessageCircle, Heart } from "lucide-react";

interface EditorFormProps {
  values: UserInput;
  onChange: (values: UserInput) => void;
}

export function EditorForm({ values, onChange }: EditorFormProps) {
  const handleInputChange = (field: keyof UserInput, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Recipient Name */}
      <div className="space-y-3">
        <Label htmlFor="recipientName" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          Who is this for?
        </Label>
        <Input
          id="recipientName"
          placeholder="Recipient's Name"
          value={values.recipientName}
          onChange={(e) => handleInputChange("recipientName", e.target.value)}
          className="h-12 rounded-xl bg-muted/30 focus:bg-background transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-3">
        <Label htmlFor="message" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          Your Message
        </Label>
        <textarea
          id="message"
          rows={5}
          placeholder="Write your heartfelt message here..."
          value={values.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className="w-full rounded-xl bg-muted/30 focus:bg-background transition-all border p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <p className="text-[10px] text-muted-foreground text-right italic">
          Keep it short and sweet for the best look!
        </p>
      </div>

      {/* Sender Name */}
      <div className="space-y-3">
        <Label htmlFor="senderName" className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
          <Heart className="h-4 w-4" />
          Your Name
        </Label>
        <Input
          id="senderName"
          placeholder="Your Name / Signature"
          value={values.senderName}
          onChange={(e) => handleInputChange("senderName", e.target.value)}
          className="h-12 rounded-xl bg-muted/30 focus:bg-background transition-all"
        />
      </div>
    </div>
  );
}
