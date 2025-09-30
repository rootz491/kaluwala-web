"use client";

import { BlogPost, Category } from "@/types/sanity";

interface BlogLayoutProps {
  children: React.ReactNode;
  recentPosts?: BlogPost[];
  categories?: Category[];
  className?: string;
}

export function BlogLayout({ children, className = "" }: BlogLayoutProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      <main>{children}</main>
    </div>
  );
}
