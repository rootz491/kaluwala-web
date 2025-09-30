import { Post } from "@/types/sanity";
import { ArticleStructuredData } from "./types";

export function generateArticleStructuredData(
  post: Post
): ArticleStructuredData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";
  const featuredImageUrl = post.mainImage?.asset?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: featuredImageUrl ? [featuredImageUrl] : undefined,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: `${baseUrl}/blog/author/${post.author.slug?.current}`,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Kaluwala",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug?.current}`,
    },
    keywords:
      post.categories?.map((cat) => cat.title).join(", ") ||
      post.tags?.map((tag) => tag.title).join(", "),
    articleSection: post.categories?.[0]?.title,
    wordCount: post.body ? JSON.stringify(post.body).length / 5 : undefined,
  };
}
