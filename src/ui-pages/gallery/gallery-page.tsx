"use client";

import { GalleryGrid } from "@/components/gallery";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GalleryDocument } from "@/types/sanity";
import { useCallback, useRef, useState } from "react";
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
  const [allItems, setAllItems] = useState<GalleryDocument[]>(
    initialData.items
  );
  const [currentPage, setCurrentPage] = useState(initialData.page);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initialData.hasNext);
  const limitRef = useRef(initialData.limit);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `/api/gallery?page=${nextPage}&limit=${limitRef.current}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }

      const newData = await response.json();

      // Append new items to existing items
      setAllItems((prev) => [...prev, ...newData.items]);
      setCurrentPage(nextPage);
      setHasMore(newData.hasNext);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError("Failed to load more items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, isLoading, hasMore]);

  const scrollTarget = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    isLoading,
    hasMore,
  });

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

        <GalleryGrid items={allItems} isLoading={false} />

        {/* Infinite scroll trigger target */}
        {hasMore && (
          <div
            ref={scrollTarget}
            className="flex items-center justify-center py-8 mt-8"
          >
            {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin">
                  <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Loading more images...
                </p>
              </div>
            )}
          </div>
        )}

        {/* End of gallery message */}
        {!hasMore && allItems.length > 0 && (
          <div className="flex items-center justify-center py-8 mt-8">
            <p className="text-sm text-muted-foreground">
              You&apos;ve reached the end of the gallery
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
