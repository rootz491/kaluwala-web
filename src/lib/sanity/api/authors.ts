import { Author } from "@/types/sanity";
import { client } from "../../sanity";
import { GET_ALL_AUTHORS, GET_AUTHOR_BY_SLUG } from "../queries";

export async function getAllAuthors(): Promise<Author[]> {
  return client.fetch(GET_ALL_AUTHORS);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return client.fetch(GET_AUTHOR_BY_SLUG, { slug });
}
