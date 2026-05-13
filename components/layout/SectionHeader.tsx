import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, subtitle, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4 w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>}
      </div>
      {actionLabel && (
        <Button variant="ghost" size="sm" onClick={onAction} className="text-primary font-bold hover:text-primary/80">
          {actionLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
