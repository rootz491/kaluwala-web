// Basic Sanity document interface
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Basic image interface from Sanity
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

// Example document type - you can expand this based on your schemas
export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  content?: any[] // Rich text content
  excerpt?: string
  mainImage?: SanityImage
  publishedAt?: string
}

// Add more document types as you create schemas in Sanity Studio