"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({
  src,
  alt,
  caption,
  isOpen,
  onClose,
}: ImageModalProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    setAspectRatio(ratio);
  };

  if (!isOpen) return null;

  // Determine if image is landscape (ratio > 1.2) or portrait/square (ratio <= 1.2)
  const isLandscape = aspectRatio && aspectRatio > 1.2;

  // Dynamic sizing based on orientation
  const imageStyles = isLandscape
    ? { maxWidth: "90vw", maxHeight: "90vh", width: "90vw", height: "auto" }
    : { maxWidth: "90vw", maxHeight: "85vh", width: "auto", height: "85vh" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative flex flex-col items-center">
        {/* Close button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-12 right-0 z-10 bg-white/90 hover:bg-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Image */}
        <div className="relative overflow-hidden rounded-lg bg-white shadow-2xl">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            style={imageStyles}
            className="object-contain"
            sizes={isLandscape ? "90vw" : "85vh"}
            priority
            onLoad={handleImageLoad}
          />
        </div>

        {/* Caption */}
        {caption && (
          <div className="mt-4 text-center max-w-[90vw]">
            <p className="text-sm text-white bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
