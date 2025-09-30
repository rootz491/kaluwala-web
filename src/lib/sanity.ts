import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true, // Enable for production
  // token: process.env.SANITY_API_TOKEN, // Uncomment if you need authenticated requests
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getSampleData() {
  try {
    const data = await client.fetch('*[_type == "post"][0...1]');
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
}
