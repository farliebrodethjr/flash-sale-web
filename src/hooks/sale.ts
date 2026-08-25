import * as api from "@/api/sale";
import type { Sale } from "@/types/sale";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

/**
 * @returns {UseQueryResult<Sale, Error>}
 */
export function useActiveSale(): UseQueryResult<Sale, Error> {
  const query = useQuery<Sale, Error>({
    queryKey: ["ACTIVE_SALE"],
    queryFn: () => api.getActiveSale(),
    refetchInterval: 10000,
  });
  return query;
}
