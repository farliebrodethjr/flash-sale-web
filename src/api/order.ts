import type { Order } from "@/types/order";
import type { PaginatedResponse } from "@/types/paginated";
import httpClient from "./http-client";
import { inputToQueryString } from "@/utils/payload";

export type GetOrdersInput = {
  cursor?: number;
  take?: number;
  status?: string;
  q?: string;
  page?: number;
};

/**
 * Fetch the order history with pagination metadata support
 * @returns {Promise<PaginatedResponse<Order>>}
 */
export function getOrders(
  input: GetOrdersInput,
): Promise<PaginatedResponse<Order>> {
  const query = inputToQueryString(input);
  const url = `order${query ? `?${query}` : ""}`;
  return httpClient.get(url).then((r) => r.data);
}
