import { StructuredData } from "@/components/seo";
import { getGalleryItems } from "@/lib/sanity/api/gallery";
import { generateSEOMetadata } from "@/lib/seo";
import { GalleryPage } from "@/ui-pages/gallery";
import { Metadata } from "next";

// Enable ISR: revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = generateSEOMetadata({
  title: "Gallery | Kaluwala",
  description:
    "Explore our beautiful gallery of community moments and memories.",
  type: "website",
});

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export default async function GalleryPageRoute() {
  // Fetch initial data server-side
  const initialData = await getGalleryItems(DEFAULT_PAGE, DEFAULT_LIMIT);

  const structuredData = {
    title: "Kaluwala Gallery",
    description:
      "Explore our beautiful gallery of community moments and memories.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in"}/gallery`,
  };

  return (
    <>
      <StructuredData type="website" data={structuredData} />
      <GalleryPage initialData={initialData} />
    </>
  );
}
