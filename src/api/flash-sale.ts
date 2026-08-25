import type { FlashSale } from "@/types/flash-sale";
import { inputToQueryString, omitEmptyParams } from "@/utils/payload";
import httpClient from "./http-client";
import type { PaginatedResponse } from "@/types/paginated";

export type GetFlashSalesInput = {
  cursor?: number;
  take?: number;
  sale_status?: string;
  page?: number;
  sale_uuid?: string;
};

export type CheckoutFlashSaleInput = {
  quantity: number;
};

/**
 * Fetch flash sales product list with pagination metadata
 * @returns {Promise<PaginatedResponse<FlashSale>>}
 */
export function getFlashSales(
  input: GetFlashSalesInput,
): Promise<PaginatedResponse<FlashSale>> {
  const query = inputToQueryString(input);
  const url = `sale-product${query ? `?${query}` : ""}`;
  return httpClient.get(url).then((r) => r.data);
}

/**
 * Show only selected flash sale product
 * @returns {Promise<FlashSale>}
 */
export function showFlashSale(uuid: string): Promise<FlashSale> {
  const url = `sale-product/${uuid}`;
  return httpClient.get(url).then((r) => r.data.data);
}

/**
 * Checkout a flash sale product
 * @returns {Promise<{ status: string; message: string }>}
 */
export function checkoutFlashSale(
  uuid: string,
  input: CheckoutFlashSaleInput,
): Promise<{ status: string; message: string }> {
  const payload = omitEmptyParams(input);
  const url = `sale-product/${uuid}/checkout`;

  return httpClient.post(url, payload).then((r) => r.data);
}
