"use client";

import { urlFor } from "@/lib/sanity";
import { GalleryDocument } from "@/types/sanity";
import Image from "next/image";

interface GalleryGridProps {
  items: GalleryDocument[];
  isLoading?: boolean;
}

export function GalleryGrid({ items, isLoading = false }: GalleryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            No gallery items found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <GalleryCard key={item._id} item={item} />
      ))}
    </div>
  );
}

interface GalleryCardProps {
  item: GalleryDocument;
}

function GalleryCard({ item }: GalleryCardProps) {
  const imageUrl = urlFor(item.image).url();

  return (
    <div className="group relative overflow-hidden rounded-lg bg-muted aspect-square">
      <Image
        src={imageUrl}
        alt={item.name || `Gallery image by ${item.username || "Unknown"}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover overlay with info */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100">
        <div className="text-white text-center">
          {item.name && (
            <p className="font-medium text-sm truncate w-full">{item.name}</p>
          )}
          {item.username && (
            <p className="text-xs text-gray-300">@{item.username}</p>
          )}
        </div>
      </div>
    </div>
  );
}
