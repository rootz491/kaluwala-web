import { Author, BlogPost, Category, Post } from "@/types/sanity";
import { client } from "./sanity";

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
      "categories": categories[]->title,
      "readingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      excerpt,
      publishedAt,
      "featuredImage": mainImage.asset->url,
      "author": author->{
        name,
        "slug": slug.current,
        "image": image.asset->url,
        bio,
        social
      },
      "categories": categories[]->{
        title,
        "slug": slug.current,
        description,
        color
      },
      "tags": tags[]->{
        title,
        "slug": slug.current
      },
      seo,
      "readingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `,
    { slug }
  );
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`
    *[_type == "post" && !(_id in path("drafts.**"))]{
      "slug": slug.current
    }
  `);
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  return client.fetch(
    `
    *[_type == "post" && !(_id in path("drafts.**")) && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
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
      "categories": categories[]->title,
      "readingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `,
    { categorySlug }
  );
}

export async function getPostsByAuthor(
  authorSlug: string
): Promise<BlogPost[]> {
  return client.fetch(
    `
    *[_type == "post" && !(_id in path("drafts.**")) && author->slug.current == $authorSlug] | order(publishedAt desc) {
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
      "categories": categories[]->title,
      "readingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `,
    { authorSlug }
  );
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      color,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `);
}

export async function getAllAuthors(): Promise<Author[]> {
  return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      bio,
      social,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return client.fetch(
    `
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      bio,
      social,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `,
    { slug }
  );
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  return client.fetch(
    `
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      color,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `,
    { slug }
  );
}

export async function getRelatedPosts(
  postId: string,
  categories: string[]
): Promise<BlogPost[]> {
  return client.fetch(
    `
    *[_type == "post" && !(_id in path("drafts.**")) && _id != $postId && count(categories[]->slug.current[@ in $categories]) > 0] | order(publishedAt desc)[0...3] {
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
      "categories": categories[]->title
    }
  `,
    { postId, categories }
  );
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const searchQuery = `*${query}*`;
  return client.fetch(
    `
    *[_type == "post" && !(_id in path("drafts.**")) && (title match $searchQuery || pt::text(body) match $searchQuery)] | order(publishedAt desc) {
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
      "categories": categories[]->title,
      "readingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `,
    { searchQuery }
  );
}
