import type { FlashSale } from "@/types/flash-sale";
import * as api from "@/api/flash-sale";
import {
  type UseQueryResult,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/paginated";

/**
 * Query flash sales list with pagination metadata
 * @returns {UseQueryResult<PaginatedResponse<FlashSale>, Error>}
 */
export function useFlashSales(
  input?: api.GetFlashSalesInput,
  options?: { enabled?: boolean },
): UseQueryResult<PaginatedResponse<FlashSale>, Error> {
  const sanitizedInput: api.GetFlashSalesInput = {
    ...input,
    sale_uuid: input?.sale_status === "active" ? input?.sale_uuid : undefined,
  };

  const isRequiredDataLoaded =
    input?.sale_status === "active" ? !!sanitizedInput.sale_uuid : true;
  const isEnabled = options?.enabled ?? isRequiredDataLoaded;

  const query = useQuery<PaginatedResponse<FlashSale>, Error>({
    queryKey: ["FLASH_SALE_PRODUCTS", sanitizedInput],
    queryFn: () => api.getFlashSales(sanitizedInput),
    placeholderData: keepPreviousData,
    enabled: isEnabled,
  });
  return query;
}

/**
 * @returns {UseQueryResult<FlashSale, Error>}
 */
export function useFlashSaleDetail(
  uuid: string,
): UseQueryResult<FlashSale, Error> {
  const query = useQuery<FlashSale, Error>({
    queryKey: ["FLASH_SALE_PRODUCT_DETAIL", uuid],
    queryFn: () => api.showFlashSale(uuid),
  });
  return query;
}
