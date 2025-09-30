export interface ArticleStructuredData {
  "@context": string;
  "@type": string;
  headline: string;
  description?: string;
  image?: string[];
  author?: {
    "@type": string;
    name: string;
    url: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  keywords?: string;
  articleSection?: string;
  wordCount?: number;
}

export interface WebsiteStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface OrganizationStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  address?: {
    "@type": string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed?: {
    "@type": string;
    name: string;
  };
  founder?: {
    "@type": string;
    name: string;
  };
}

export interface BreadcrumbStructuredData {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface PersonStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  image?: string;
  description?: string;
  sameAs?: string[];
}
