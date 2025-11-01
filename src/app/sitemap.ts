import { getAllAuthors, getAllCategories, getAllPosts } from "@/lib/blog-api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";

  // Get all posts, categories and authors
  const [posts, categories, authors] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllAuthors(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog/all`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // Blog posts - filter out posts without valid slugs
  const postPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug?.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Category pages - filter out categories without valid slugs
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((category) => category.slug?.current)
    .map((category) => ({
      url: `${baseUrl}/blog/category/${category.slug?.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Author pages
  const authorPages: MetadataRoute.Sitemap = (authors || [])
    .filter((author) => author.slug?.current)
    .map((author) => ({
      url: `${baseUrl}/blog/author/${author.slug?.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  // Additional top-level static pages
  const extraStatic: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [
    ...staticPages,
    ...postPages,
    ...categoryPages,
    ...authorPages,
    ...extraStatic,
  ];
}
