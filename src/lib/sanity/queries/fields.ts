export const POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  _updatedAt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  },
  "featuredImage": mainImage.asset->url,
  "author": author->{
    name,
    "slug": slug.current,
    "image": image.asset->url,
    bio
  },
  "categories": categories[]->{
    title,
    "slug": slug.current,
    description
  },
  "tags": tags[]->{
    title,
    "slug": slug.current
  }
`;

export const BLOG_POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "featuredImage": mainImage.asset->url,
  "author": author->{
    name,
    "slug": slug.current,
    "image": image.asset->url
  },
  "categories": categories[]->{
    title,
    "slug": slug.current,
    description
  },
  "readingTime": round(length(pt::text(body)) / 5 / 180)
`;

export const AUTHOR_FIELDS = `
  _id,
  name,
  slug,
  bio,
  "image": image.asset->url,
  social
`;

export const CATEGORY_FIELDS = `
  _id,
  title,
  slug,
  description,
  color
`;
