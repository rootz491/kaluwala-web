import legalContent from "@/data/legal-content.json";
import { generateSEOMetadata } from "@/lib/seo";
import { LegalPage } from "@/ui-pages";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: legalContent.seo.title,
  description: legalContent.seo.description,
  type: "website",
});

export default function Page() {
  return <LegalPage />;
}
