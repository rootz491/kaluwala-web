import { CATEGORY_FIELDS } from "./fields";

export const GET_ALL_CATEGORIES = `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    ${CATEGORY_FIELDS}
  }
`;

export const GET_CATEGORY_BY_SLUG = `
  *[_type == "category" && slug.current == $slug][0] {
    ${CATEGORY_FIELDS}
  }
`;

export const GET_CATEGORIES_PATHS = `
  *[_type == "category" && defined(slug.current)].slug.current
`;
