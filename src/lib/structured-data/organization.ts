import { OrganizationStructuredData } from "./types";

export function generateOrganizationStructuredData(): OrganizationStructuredData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kaluwala",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "A hidden sanctuary in Uttarakhand where nature's rhythm restores your soul. Discover the serenity of the forest, the Song River, and the ancient Kalusidh Temple.",
    sameAs: [
      "https://instagram.com/kaluwala",
      "https://linkedin.com/company/kaluwala",
      "https://twitter.com/kaluwala",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Place",
      name: "Uttarakhand, India",
    },
    founder: {
      "@type": "Person",
      name: "Kaluwala Community",
    },
  };
}
