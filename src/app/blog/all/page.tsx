import { getAllCategories, getAllPosts } from "@/lib/blog-api";
import { AllPostsPage } from "@/ui-pages";
import { Metadata } from "next";

// Enable ISR: revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Blogs | Kaluwala Blog",
  description: "Browse all blog posts and articles on Kaluwala.",
};

export default async function AllPostsPageRoute() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return <AllPostsPage posts={posts} categories={categories} />;
}
