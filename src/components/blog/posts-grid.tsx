"use client";

import { BlogPost } from "@/types/sanity";
import { PostCard } from "./post-card";

interface PostsGridProps {
  posts: BlogPost[];
  featuredPost?: BlogPost;
  className?: string;
}

export function PostsGrid({
  posts,
  featuredPost,
  className = "",
}: PostsGridProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {featuredPost && (
        <div className="mb-12">
          <PostCard post={featuredPost} variant="featured" />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
