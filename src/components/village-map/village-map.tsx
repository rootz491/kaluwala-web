"use client";

import { MAP_CONFIG } from "@/config/map-config";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import Leaflet components (client-side only)
// This keeps the initial bundle size small
const DynamicMap = dynamic(() => import("./village-map-content"), {
  loading: () => (
    <div className="w-full h-96 bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
  ssr: false, // Client-side only rendering
});

export function VillageMap() {
  return (
    <Suspense fallback={<div className="w-full h-96 bg-muted rounded-lg" />}>
      <DynamicMap config={MAP_CONFIG} />
    </Suspense>
  );
}
