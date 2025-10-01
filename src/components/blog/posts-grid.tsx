"use client";

import { AdCard } from "@/components/ads";
import { BlogPost } from "@/types/sanity";
import { PostCard } from "./post-card";

interface PostsGridProps {
  posts: BlogPost[];
  featuredPost?: BlogPost;
  className?: string;
  showAds?: boolean;
}

export function PostsGrid({
  posts,
  featuredPost,
  className = "",
  showAds = true,
}: PostsGridProps) {
  // Function to insert ads at strategic positions
  const getPostsWithAds = () => {
    if (!showAds) return posts;

    const result: (BlogPost | "ad")[] = [];
    posts.forEach((post, index) => {
      result.push(post);
      // Insert ad after every 4 posts (but not at the very beginning or end)
      if ((index + 1) % 4 === 0 && index < posts.length - 1) {
        result.push("ad");
      }
    });
    return result;
  };

  const postsWithAds = getPostsWithAds();

  return (
    <div className={`space-y-8 ${className}`}>
      {featuredPost && (
        <div className="mb-12">
          <PostCard post={featuredPost} variant="featured" />
        </div>
      )}

      <div
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        {postsWithAds.map((item, index) => (
          <div
            key={item === "ad" ? `ad-${index}` : item._id}
            className="break-inside-avoid mb-6"
          >
            {item === "ad" ? <AdCard /> : <PostCard post={item} />}
          </div>
        ))}
      </div>
    </div>
  );
}
