"use client";

import { PostsGrid } from "@/components/blog/posts-grid";
import { LowerLayout } from "@/components/layout/lower-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchPosts } from "@/lib/blog-api";
import { BlogPost, Category } from "@/types/sanity";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface SearchPageProps {
  categories: Category[];
}

function SearchComponent({ categories }: SearchPageProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchPosts(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);

    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <LowerLayout categories={categories} recentPosts={[]}>
      <div className="space-y-8">
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Search Blog Posts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find articles, tutorials, and insights across our blog.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search for posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <Search className="h-4 w-4" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {initialQuery && (
          <div className="text-center">
            <p className="text-muted-foreground">
              {isLoading
                ? "Searching..."
                : `${searchResults.length} results for &quot;${initialQuery}&quot;`}
            </p>
          </div>
        )}

        {searchResults.length > 0 && <PostsGrid posts={searchResults} />}

        {!isLoading && query && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found for &quot;{query}&quot;. Try different keywords.
            </p>
          </div>
        )}
      </div>
    </LowerLayout>
  );
}

export function BlogSearchPage({ categories }: SearchPageProps) {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchComponent categories={categories} />
    </Suspense>
  );
}
