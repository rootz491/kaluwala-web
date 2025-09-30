import supportContent from "@/data/support-content.json";
import { generateSEOMetadata } from "@/lib/seo";
import { SupportPage } from "@/ui-pages";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: supportContent.seo.title,
  description: supportContent.seo.description,
  type: "website",
});

export default function Page() {
  return <SupportPage />;
}
