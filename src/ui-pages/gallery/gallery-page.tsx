"use client";

import { GalleryGrid, GalleryPagination } from "@/components/gallery";
import { GalleryDocument } from "@/types/sanity";
import { useCallback, useState } from "react";
import BackButton from "../../components/ui/BackButton";

interface GalleryPageProps {
  initialData: {
    items: GalleryDocument[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function GalleryPage({ initialData }: GalleryPageProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/gallery?page=${newPage}&limit=${data.limit}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery items");
        }

        const newData = await response.json();
        setData(newData);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError("Failed to load gallery items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [data.limit]
  );

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gallery</h1>
          <p className="text-muted-foreground">
            Discover beautiful moments from our community
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <GalleryGrid items={data.items} isLoading={isLoading} />

        <GalleryPagination
          page={data.page}
          total={data.total}
          limit={data.limit}
          hasNext={data.hasNext}
          hasPrev={data.hasPrev}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
