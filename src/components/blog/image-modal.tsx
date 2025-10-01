"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col">
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
        <div className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-lg bg-white">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-full object-contain"
            sizes="90vw"
            priority
          />
        </div>

        {/* Caption */}
        {caption && (
          <div className="mt-4 text-center">
            <p className="text-sm text-white bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
