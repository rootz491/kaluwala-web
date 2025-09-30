import { StructuredData } from "@/components/seo";
import homepageContent from "@/data/homepage-content.json";
import { HomePage } from "@/ui-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: homepageContent.seo.title,
  description: homepageContent.seo.description,
  keywords: homepageContent.seo.keywords,
  openGraph: {
    title: homepageContent.seo.title,
    description: homepageContent.seo.description,
    type: "website",
    locale: "en_US",
    siteName: "Kaluwala",
  },
  twitter: {
    card: "summary_large_image",
    title: homepageContent.seo.title,
    description: homepageContent.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteData = {
  title: homepageContent.seo.title,
  description: homepageContent.seo.description,
  url: "https://kaluwala.in",
};

export default function Home() {
  return (
    <>
      <StructuredData type="website" data={websiteData} />
      <StructuredData type="organization" />
      <HomePage />
    </>
  );
}
