import { Author, Post } from "@/types/sanity";

interface StructuredDataProps {
  type: "article" | "website" | "organization" | "breadcrumb" | "person";
  data:
    | Post
    | Author
    | { title: string; description: string; url?: string }
    | Array<{ name: string; url: string }>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, unknown> = {};

  switch (type) {
    case "article":
      structuredData = generateArticleStructuredData(data as Post);
      break;
    case "website":
      structuredData = generateWebsiteStructuredData(
        data as { title: string; description: string; url?: string }
      );
      break;
    case "organization":
      structuredData = generateOrganizationStructuredData();
      break;
    case "breadcrumb":
      structuredData = generateBreadcrumbStructuredData(
        data as Array<{ name: string; url: string }>
      );
      break;
    case "person":
      structuredData = generatePersonStructuredData(data as Author);
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function generateArticleStructuredData(post: Post) {
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
          url: `${baseUrl}/blog/author/${post.author.slug.current}`,
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
      "@id": `${baseUrl}/blog/${post.slug.current}`,
    },
    keywords:
      post.categories?.map((cat) => cat.title).join(", ") ||
      post.tags?.map((tag) => tag.title).join(", "),
    articleSection: post.categories?.[0]?.title,
    wordCount: post.body ? JSON.stringify(post.body).length / 5 : undefined,
  };
}

function generateWebsiteStructuredData(data: {
  title: string;
  description: string;
  url?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.title,
    description: data.description,
    url: data.url || baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function generateOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kaluwala",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "A modern web development company specializing in Next.js, React, and modern web technologies.",
    sameAs: [
      "https://twitter.com/kaluwala",
      "https://github.com/kaluwala",
      "https://linkedin.com/company/kaluwala",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@kaluwala.com",
    },
  };
}

function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function generatePersonStructuredData(author: Author) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";
  const authorImageUrl =
    typeof author.image === "string" ? author.image : author.image?.asset?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${baseUrl}/blog/author/${author.slug.current}`,
    image: authorImageUrl,
    description: author.bio ? JSON.stringify(author.bio) : undefined,
    sameAs: [
      author.social?.twitter
        ? `https://twitter.com/${author.social.twitter}`
        : undefined,
      author.social?.linkedin,
      author.social?.website,
    ].filter(Boolean),
  };
}
