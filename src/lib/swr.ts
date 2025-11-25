"use client";

import useSWR, { SWRConfiguration } from "swr";
import { Query } from "appwrite";
import { databases, DB_ID } from "./appwrite";

/**
 * Generic hook to fetch documents from an Appwrite collection
 */
export function useCollection<T = unknown>(
  collectionId: string,
  queries: string[] = [],
  config?: SWRConfiguration
) {
  const key = collectionId ? [collectionId, ...queries].join("|") : null;

  return useSWR<T[]>(
    key,
    async () => {
      const res = await databases.listDocuments(DB_ID, collectionId, queries);
      return res.documents as T[];
    },
    {
      revalidateOnFocus: false,
      ...config,
    }
  );
}

/**
 * Hook to fetch a single document by ID
 */
export function useDocument<T = unknown>(
  collectionId: string,
  documentId: string | null,
  config?: SWRConfiguration
) {
  const key = collectionId && documentId ? `${collectionId}/${documentId}` : null;

  return useSWR<T>(
    key,
    async () => {
      const doc = await databases.getDocument(DB_ID, collectionId, documentId!);
      return doc as T;
    },
    {
      revalidateOnFocus: false,
      ...config,
    }
  );
}

// Re-export Query for convenience
export { Query };
