import { Author } from "@/types/sanity";
import { PersonStructuredData } from "./types";

export function generatePersonStructuredData(
  author: Author
): PersonStructuredData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";
  const authorImageUrl =
    typeof author.image === "string" ? author.image : author.image?.asset?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${baseUrl}/blog/author/${author.slug?.current}`,
    image: authorImageUrl,
    description: author.bio ? JSON.stringify(author.bio) : undefined,
    sameAs: [
      author.social?.twitter
        ? `https://twitter.com/${author.social.twitter}`
        : undefined,
      author.social?.linkedin,
      author.social?.website,
    ].filter(Boolean) as string[],
  };
}
