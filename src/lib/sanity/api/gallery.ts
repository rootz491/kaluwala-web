import { client } from "@/lib/sanity";
import { GalleryDocument } from "@/types/sanity";

interface PaginatedGalleryResult {
  items: GalleryDocument[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Fetch paginated approved gallery items from Sanity
 * @param page - Page number (1-indexed)
 * @param limit - Items per page
 * @returns Paginated gallery items with metadata
 */
export async function getGalleryItems(
  page: number = 1,
  limit: number = 12
): Promise<PaginatedGalleryResult> {
  try {
    // Ensure valid pagination params
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(limit, 100)); // Cap at 100 per page
    const offset = (validPage - 1) * validLimit;

    // Get total count of approved items
    const countQuery = `count(*[_type == "gallery" && status == "approved"])`;
    const total = await client.fetch<number>(countQuery);

    // Fetch paginated items
    const query = `*[_type == "gallery" && status == "approved"]
      | order(createdAt desc)
      [${offset}...${offset + validLimit}]
      {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        image {
          _type,
          asset {
            _ref,
            _type
          },
          hotspot {
            x,
            y,
            height,
            width
          },
          crop {
            top,
            bottom,
            left,
            right
          }
        },
        telegramId,
        username,
        name,
        status,
        createdAt
      }`;

    const items = await client.fetch<GalleryDocument[]>(query);

    const totalPages = Math.ceil(total / validLimit);
    const hasNext = validPage < totalPages;
    const hasPrev = validPage > 1;

    return {
      items,
      total,
      page: validPage,
      limit: validLimit,
      hasNext,
      hasPrev,
    };
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    throw new Error("Failed to fetch gallery items");
  }
}

/**
 * Fetch a single gallery item by ID
 */
export async function getGalleryItemById(
  id: string
): Promise<GalleryDocument | null> {
  try {
    const query = `*[_type == "gallery" && _id == $id][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      image {
        _type,
        asset {
          _ref,
          _type
        },
        hotspot {
          x,
          y,
          height,
          width
        },
        crop {
          top,
          bottom,
          left,
          right
        }
      },
      telegramId,
      username,
      name,
      createdAt
    }`;

    const item = await client.fetch<GalleryDocument | null>(query, { id });
    return item || null;
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return null;
  }
}

/**
 * Get gallery statistics (approved count, pending count, etc.)
 */
export async function getGalleryStats() {
  try {
    const query = `{
      approved: count(*[_type == "gallery" && status == "approved"]),
      pending: count(*[_type == "gallery" && status == "pending"]),
      rejected: count(*[_type == "gallery" && status == "rejected"]),
      total: count(*[_type == "gallery"])
    }`;

    const stats = await client.fetch(query);
    return stats;
  } catch (error) {
    console.error("Error fetching gallery stats:", error);
    return { approved: 0, pending: 0, rejected: 0, total: 0 };
  }
}
