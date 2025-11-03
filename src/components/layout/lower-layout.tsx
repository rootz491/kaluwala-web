"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { BlogPost, Category } from "@/types/sanity";

interface LowerLayoutProps {
  children: React.ReactNode;
  recentPosts?: BlogPost[];
  categories?: Category[];
  className?: string;
}

export function LowerLayout({ children, className = "" }: LowerLayoutProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
