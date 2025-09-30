import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true, // Enable for production
  // token: process.env.SANITY_API_TOKEN, // Uncomment if you need authenticated requests
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Example query function
export async function getSampleData() {
  try {
    // This is just a placeholder query - you'll replace this with actual schema queries later
    const data = await client.fetch('*[_type == "post"][0...10]')
    return data
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
    return []
  }
}