import { StructuredData } from "@/components/seo";
import { getAllCategories, getAllPosts } from "@/lib/blog-api-new";
import { generateSEOMetadata } from "@/lib/seo";
import { BlogPage } from "@/ui-pages";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog | Kaluwala",
  description:
    "Discover insights, tutorials, and stories about technology, development, and innovation.",
  type: "website",
});

export default async function BlogPageRoute() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const structuredData = {
    title: "Kaluwala Blog",
    description:
      "Discover insights, tutorials, and stories about technology, development, and innovation.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in"}/blog`,
  };

  return (
    <>
      <StructuredData type="website" data={structuredData} />
      <BlogPage posts={posts} categories={categories} />
    </>
  );
}
