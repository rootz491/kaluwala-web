"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  firstName?: string;
  username?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({
  imageUrl,
  alt,
  firstName,
  username,
  isOpen,
  onClose,
}: ImageModalProps) {
  // Handle Esc key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur and dull effect */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-[80vw] max-h-[80vh] flex flex-col items-center justify-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-contain"
              sizes="80vw"
              priority
            />
          </div>

          {/* Info below image */}
          {(firstName || username) && (
            <div className="absolute bottom-4 left-4 right-4 md:hidden bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
              {firstName && <p className="font-medium text-sm">{firstName}</p>}
              {username && <p className="text-xs text-gray-300">@{username}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
