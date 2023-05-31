import {
  endBefore,
  getDocs,
  limit,
  Query,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

import type { PaginationInfo, PaginationOptions } from "./types";

function buildPaginatedResponse<DocumentType>(
  results: QueryDocumentSnapshot<DocumentType>[],
  pageSize?: number,
) {
  let hasNextPage: boolean;

  if (pageSize != null && results.length > pageSize) {
    hasNextPage = true;
    results.pop();
  } else {
    hasNextPage = false;
  }

  const paginationInfo: PaginationInfo<DocumentType> = {
    startCursor: results[0],
    endCursor: results[results.length - 1],
    hasNextPage,
  };
  return { data: results, paginationInfo };
}

// This actually gets one more document than requested (e.g. if you
// request 10 documents, you'll get 11) for the purposes of detecting
// if there's a next page. Use buildPaginatedResponse to remove the
// extra if it exists while also getting a boolean for if there's a
// next page.
export function paginateQuery<DocumentType>(
  unpaginatedQuery: Query<DocumentType>,
  paginationOptions: PaginationOptions<DocumentType>,
) {
  const { limit: pageSize, after, before } = paginationOptions;

  const paginatedArgs: QueryConstraint[] = [];

  if (pageSize != null) {
    paginatedArgs.push(limit(pageSize + 1));
  }

  if (after != null) {
    paginatedArgs.push(startAfter(after));
  } else if (before != null) {
    paginatedArgs.push(endBefore(before));
  }

  return query(unpaginatedQuery, ...paginatedArgs);
}

export async function getPaginatedDocs<DocumentType>(
  unpaginatedQuery: Query<DocumentType>,
  paginationOptions: PaginationOptions<DocumentType> = {},
) {
  const paginatedQuery = paginateQuery(unpaginatedQuery, paginationOptions);
  const results = await getDocs(paginatedQuery);

  return buildPaginatedResponse(results.docs, paginationOptions.limit);
}
