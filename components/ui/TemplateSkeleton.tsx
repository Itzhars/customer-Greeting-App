"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TemplateSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60%] rounded-full" />
            <Skeleton className="h-4 w-[40%] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
