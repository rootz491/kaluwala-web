"use client";

import { urlFor } from "@/lib/sanity";
import { SanityImage } from "@/types/sanity";
import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "./image-modal";

interface SmartImageProps {
  value: SanityImage & { alt?: string; caption?: string };
}

export function SmartImage({ value }: SmartImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  if (!value?.asset) return null;

  try {
    // Get different sized URLs
    const imageUrl = urlFor(value).width(800).quality(85).url();
    const fullSizeUrl = urlFor(value).width(1200).quality(90).url();

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      const ratio = img.naturalWidth / img.naturalHeight;
      setAspectRatio(ratio);
    };

    // Determine if image is landscape (ratio > 1.2) or portrait/square (ratio <= 1.2)
    const isLandscape = aspectRatio && aspectRatio > 1.2;

    // Choose container classes based on aspect ratio
    const containerClasses = isLandscape
      ? "w-full max-w-full" // Full width for landscape
      : "max-w-md md:max-w-lg lg:max-w-xl mx-auto"; // Limited width for portrait

    return (
      <>
        <figure className="my-8 flex flex-col items-center">
          <div
            className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] ${containerClasses}`}
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes={
                isLandscape
                  ? "(max-width: 768px) 100vw, 80vw"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 512px, 576px"
              }
              onLoad={handleImageLoad}
              priority={false}
            />

            {/* Click indicator */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="bg-white/90 rounded-full p-2 backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {value.caption && (
            <figcaption
              className={`text-sm text-muted-foreground text-center mt-3 italic ${
                isLandscape ? "max-w-full" : "max-w-md md:max-w-lg lg:max-w-xl"
              }`}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>

        <ImageModal
          src={fullSizeUrl}
          alt={value.alt || "Blog image"}
          caption={value.caption}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  } catch (error) {
    console.error("Error rendering image:", error);
    return (
      <div className="my-8 p-4 bg-muted rounded-lg text-center max-w-md mx-auto">
        <p className="text-muted-foreground">Image could not be loaded</p>
        {value.alt && (
          <p className="text-sm text-muted-foreground mt-1">{value.alt}</p>
        )}
      </div>
    );
  }
}
