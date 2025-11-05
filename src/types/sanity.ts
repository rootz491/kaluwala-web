// Basic Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  style?: string;
  listItem?: string;
  level?: number;
}

export interface PortableTextSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

export interface Post extends SanityDocument {
  _type: "post";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  } | null;
  body?: PortableTextBlock[];
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  author?: Author;
  categories?: Category[];
  tags?: Tag[];
  telegramId?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface Author extends SanityDocument {
  _type: "author";
  name: string;
  slug: {
    _type: "slug";
    current: string;
  } | null;
  image?: SanityImage;
  bio?: PortableTextBlock[];
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category extends SanityDocument {
  _type: "category";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  } | null;
  description?: string;
  color?: string;
  postCount?: number;
}

export interface Tag extends SanityDocument {
  _type: "tag";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  } | null;
}

export interface GalleryDocument extends SanityDocument {
  _type: "gallery";
  image: SanityImage;
  telegramId: string;
  username?: string;
  firstName?: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
}

export interface BlogPostAuthor {
  name: string;
  slug: string; // This is resolved to a string in BLOG_POST_FIELDS
  image?: string;
}

export interface BlogPost extends Omit<Post, "author"> {
  featuredImage?: string;
  authorName?: string;
  authorImage?: string;
  authorSlug?: string;
  readingTime?: number;
  // Override author type for BlogPost to match the resolved query structure
  author?: BlogPostAuthor;
  // Remove categoryTitles since we now use the full categories array from Post
}
