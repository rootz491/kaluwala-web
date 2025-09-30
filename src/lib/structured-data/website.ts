import { WebsiteStructuredData } from "./types";

export function generateWebsiteStructuredData(data: {
  title: string;
  description: string;
  url?: string;
}): WebsiteStructuredData {
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
