import { Author, Category, Post } from "@/types/sanity";
import { Metadata } from "next";

interface SEOOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  section?: string;
}

export function generateSEOMetadata(options: SEOOptions): Metadata {
  const {
    title = "Kaluwala",
    description = "A modern web application built with Next.js, Sanity CMS, Tailwind CSS, and shadcn/ui",
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    tags,
    section,
  } = options;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in"
    ),

    // Open Graph
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: "Kaluwala",
      locale: "en_US",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
      creator: "@kaluwala",
      site: "@kaluwala",
    },

    // Additional meta tags
    keywords: tags?.join(", "),
    authors: authors?.map((author) => ({ name: author })),
    creator: "Kaluwala",
    publisher: "Kaluwala",

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification (add your verification codes)
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      // yandex: 'your-yandex-verification',
      // yahoo: 'your-yahoo-verification',
    },
  };

  return metadata;
}

export function generateBlogPostMetadata(post: Post): Metadata {
  const featuredImageUrl = post.mainImage?.asset?.url;

  return generateSEOMetadata({
    title: `${post.title} | Kaluwala Blog`,
    description:
      post.excerpt ||
      post.seo?.description ||
      `Read about ${post.title} on Kaluwala blog.`,
    image: featuredImageUrl,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt,
    authors: post.author?.name ? [post.author.name] : undefined,
    tags:
      post.categories?.map((cat) => cat.title) ||
      post.tags?.map((tag) => tag.title),
    section: post.categories?.[0]?.title,
  });
}

export function generateCategoryMetadata(
  category: Category,
  postCount: number
): Metadata {
  return generateSEOMetadata({
    title: `${category.title} | Kaluwala Blog`,
    description:
      category.description ||
      `Explore ${postCount} articles about ${category.title} on Kaluwala blog.`,
    type: "website",
  });
}

export function generateAuthorMetadata(
  author: Author,
  postCount: number
): Metadata {
  const authorImageUrl =
    typeof author.image === "string" ? author.image : author.image?.asset?.url;

  return generateSEOMetadata({
    title: `${author.name} | Kaluwala Blog`,
    description: `Read ${postCount} articles by ${author.name} on Kaluwala blog.`,
    image: authorImageUrl,
    type: "website",
  });
}
