"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlogPost, Category } from "@/types/sanity";
import { Calendar, Search, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PostCard } from "./post-card";

interface BlogLayoutProps {
  children: React.ReactNode;
  recentPosts?: BlogPost[];
  categories?: Category[];
  className?: string;
}

export function BlogLayout({
  children,
  recentPosts = [],
  categories = [],
  className = "",
}: BlogLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog/search?q=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-4">
        <main className="lg:col-span-3">{children}</main>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center justify-between"
                    >
                      <Badge variant="outline" asChild>
                        <Link
                          href={`/blog/category/${category.slug?.current}`}
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {category.title}
                        </Link>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {category.postCount || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {recentPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Posts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentPosts.slice(0, 5).map((post) => (
                    <PostCard key={post._id} post={post} variant="compact" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to get the latest posts delivered right to your inbox.
              </p>
              <form className="space-y-2">
                <Input type="email" placeholder="Enter your email" />
                <Button className="w-full" size="sm">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
