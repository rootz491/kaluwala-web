import { BLOG_POST_FIELDS, POST_FIELDS } from "./fields";

export const GET_ALL_POSTS = `
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc) {
    ${BLOG_POST_FIELDS}
  }
`;

export const GET_POST_BY_SLUG = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS}
  }
`;

export const GET_RECENT_POSTS = `
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc)[0...$limit] {
    ${BLOG_POST_FIELDS}
  }
`;

export const GET_POSTS_BY_CATEGORY = `
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && $slug in categories[]->slug.current] | order(publishedAt desc) {
    ${BLOG_POST_FIELDS}
  }
`;

export const SEARCH_POSTS = `
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && (
    title match $searchQuery + "*" ||
    excerpt match $searchQuery + "*" ||
    pt::text(body) match $searchQuery + "*"
  )] | order(publishedAt desc) {
    ${BLOG_POST_FIELDS}
  }
`;

export const GET_RELATED_POSTS = `
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && _id != $postId && count((categories[]->slug.current)[@ in $categories]) > 0] | order(publishedAt desc)[0..2] {
    ${BLOG_POST_FIELDS}
  }
`;

export const GET_POSTS_PATHS = `
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)].slug.current
`;
