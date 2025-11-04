import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

/**
 * Hook to detect when user scrolls near the bottom of the page
 * and trigger a callback to load more content
 */
export function useInfiniteScroll({
  onLoadMore,
  isLoading = false,
  hasMore = true,
}: UseInfiniteScrollOptions) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerTarget.current || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When the observer target becomes visible (80% in viewport)
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        // Trigger when 80% of the target is visible
        threshold: 0.8,
      }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, isLoading, hasMore]);

  return observerTarget;
}
