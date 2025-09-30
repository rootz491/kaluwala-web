import { Category } from "@/types/sanity";
import { client } from "../../sanity";
import {
  GET_ALL_CATEGORIES,
  GET_CATEGORIES_PATHS,
  GET_CATEGORY_BY_SLUG,
} from "../queries";

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(GET_ALL_CATEGORIES);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  return client.fetch(GET_CATEGORY_BY_SLUG, { slug });
}

export async function getCategoriesPaths(): Promise<string[]> {
  return client.fetch(GET_CATEGORIES_PATHS);
}
