import contactContent from "@/data/contact-content.json";
import { generateSEOMetadata } from "@/lib/seo";
import { ContactPage } from "@/ui-pages";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: contactContent.seo.title,
  description: contactContent.seo.description,
  type: "website",
});

export default function Page() {
  return <ContactPage />;
}
