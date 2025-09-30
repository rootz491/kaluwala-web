import { BlogPost, Post } from "@/types/sanity";
import { client } from "../../sanity";
import {
  GET_ALL_POSTS,
  GET_POST_BY_SLUG,
  GET_POSTS_BY_CATEGORY,
  GET_POSTS_PATHS,
  GET_RECENT_POSTS,
  GET_RELATED_POSTS,
  SEARCH_POSTS,
} from "../queries";

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(GET_ALL_POSTS);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(GET_POST_BY_SLUG, { slug });
}

export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
  return client.fetch(GET_RECENT_POSTS, { limit });
}

export async function getPostsByCategory(slug: string): Promise<BlogPost[]> {
  return client.fetch(GET_POSTS_BY_CATEGORY, { slug });
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  return client.fetch(SEARCH_POSTS, { searchQuery: query });
}

export async function getRelatedPosts(
  postId: string,
  categories: string[]
): Promise<BlogPost[]> {
  return client.fetch(GET_RELATED_POSTS, { postId, categories });
}

export async function getPostsPaths(): Promise<string[]> {
  return client.fetch(GET_POSTS_PATHS);
}
