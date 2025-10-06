import { generateSEOMetadata } from "@/lib/seo";
import { NewsPage } from "@/ui-pages";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "News | Kaluwala",
  description:
    "Stay updated with the latest happenings from our peaceful village by the Song River. From local events to community updates.",
  type: "website",
});

export default function Page() {
  return <NewsPage />;
}
