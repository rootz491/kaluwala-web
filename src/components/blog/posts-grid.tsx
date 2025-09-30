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

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 px-6">
        {posts.map((post) => (
          <div key={post._id} className="break-inside-avoid mb-6">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
