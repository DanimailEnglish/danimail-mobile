import {
  getDocs,
  limit,
  Query,
  query,
  QueryDocumentSnapshot,
  QueryLimitConstraint,
  QueryStartAtConstraint,
  startAfter,
} from "firebase/firestore";

import type { PaginationInfo, PaginationOptions } from "./types";

function buildPaginatedResponse<DocumentType>(
  results: QueryDocumentSnapshot<DocumentType>[],
  pageSize: number,
) {
  let hasNextPage: boolean;

  if (results.length > pageSize) {
    hasNextPage = true;
    results.pop();
  } else {
    hasNextPage = false;
  }

  const paginationInfo: PaginationInfo<DocumentType> = {
    endCursor: results[results.length - 1],
    hasNextPage,
  };
  return { data: results, paginationInfo };
}

export async function getPaginatedDocs<DocumentType>(
  unpaginatedQuery: Query<DocumentType>,
  paginationOptions: PaginationOptions<DocumentType> = {},
) {
  const { limit: pageSize = 30, after } = paginationOptions;

  const limitArg = limit(pageSize + 1);
  let paginationQueryArgs:
    | [QueryLimitConstraint]
    | [QueryLimitConstraint, QueryStartAtConstraint];
  if (after != null) {
    paginationQueryArgs = [limitArg, startAfter(after)];
  } else {
    paginationQueryArgs = [limitArg];
  }

  const paginatedQuery = query(unpaginatedQuery, ...paginationQueryArgs);
  const results = await getDocs(paginatedQuery);

  return buildPaginatedResponse(results.docs, pageSize);
}
