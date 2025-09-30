import { BreadcrumbStructuredData } from "./types";

export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbStructuredData {
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
