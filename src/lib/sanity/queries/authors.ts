import { AUTHOR_FIELDS } from "./fields";

export const GET_ALL_AUTHORS = `
  *[_type == "author"] | order(name asc) {
    ${AUTHOR_FIELDS}
  }
`;

export const GET_AUTHOR_BY_SLUG = `
  *[_type == "author" && slug.current == $slug][0] {
    ${AUTHOR_FIELDS}
  }
`;
