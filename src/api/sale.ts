import httpClient from "./http-client";
import type { Sale } from "@/types/sale";

/**
 * Fetch the latest active sale
 * @returns {Promise<Sale>}
 */
export function getActiveSale(): Promise<Sale> {
  const url = `sale/active`;
  return httpClient.get(url).then((r) => r.data?.data ?? r.data);
}
