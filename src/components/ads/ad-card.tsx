"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GoogleAdSense } from "./google-adsense";

interface AdCardProps {
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function AdCard({ variant = "default", className = "" }: AdCardProps) {
  const adClient = "ca-pub-1885905784997014";
  const adSlot = "7440526491";

  if (variant === "featured") {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Advertisement
            </span>
          </div>
          <div className="min-h-[200px] flex items-center justify-center">
            <GoogleAdSense
              adClient={adClient}
              adSlot={adSlot}
              adFormat="fluid"
              adLayoutKey="-6t+ed+2i-1n-4w"
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`p-4 border-b last:border-b-0 ${className}`}>
        <div className="text-center mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Advertisement
          </span>
        </div>
        <div className="min-h-[100px] flex items-center justify-center">
          <GoogleAdSense
            adClient={adClient}
            adSlot={adSlot}
            adFormat="fluid"
            adLayoutKey="-6t+ed+2i-1n-4w"
            className="w-full"
          />
        </div>
      </div>
    );
  }

  // Default masonry card style
  return (
    <div
      className={`overflow-hidden rounded-lg shadow-lg border bg-card ${className}`}
    >
      <div className="p-4">
        <div className="text-center mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Advertisement
          </span>
        </div>
        <div className="min-h-[200px] flex items-center justify-center">
          <GoogleAdSense
            adClient={adClient}
            adSlot={adSlot}
            adFormat="fluid"
            adLayoutKey="-6t+ed+2i-1n-4w"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
