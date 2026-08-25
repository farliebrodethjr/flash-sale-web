import * as api from "@/api/order";
import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Order } from "@/types/order";
import type { PaginatedResponse } from "@/types/paginated";

/**
 * Query order list with pagination metadata
 * @returns {UseQueryResult<PaginatedResponse<Order>, Error>}
 */
export function useOrders(
  input?: api.GetOrdersInput,
): UseQueryResult<PaginatedResponse<Order>, Error> {
  const query = useQuery<PaginatedResponse<Order>, Error>({
    queryKey: ["ORDERS", input],
    queryFn: () => api.getOrders(input ?? {}),
    placeholderData: keepPreviousData,
  });
  return query;
}
