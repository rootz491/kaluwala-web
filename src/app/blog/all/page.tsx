import { BlogLayout } from "@/components/blog/blog-layout";
import { PostsGrid } from "@/components/blog/posts-grid";
import { Button } from "@/components/ui/button";
import { getAllCategories, getAllPosts } from "@/lib/blog-api";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Posts | Kaluwala Blog",
  description: "Browse all blog posts and articles on Kaluwala.",
};

export default async function AllPostsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return (
    <BlogLayout categories={categories} recentPosts={posts.slice(0, 5)}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              All Posts
            </h1>
            <p className="text-xl text-muted-foreground mt-4">
              Browse through all {posts.length} articles and tutorials.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <PostsGrid posts={posts} />
      </div>
    </BlogLayout>
  );
}
