import { Profile } from "./profile.model";

export interface PagedResult<T> {
  items: Profile[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}