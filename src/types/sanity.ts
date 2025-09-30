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

// Portable Text content types (for rich text content from Sanity)
export interface PortableTextBlock {
  _type: string
  _key: string
  children?: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
  style?: string
  listItem?: string
  level?: number
}

export interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

export interface PortableTextMarkDef {
  _type: string
  _key: string
  [key: string]: unknown
}

// Example document type - you can expand this based on your schemas
export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  content?: PortableTextBlock[] // Rich text content
  excerpt?: string
  mainImage?: SanityImage
  publishedAt?: string
}

// Add more document types as you create schemas in Sanity Studio