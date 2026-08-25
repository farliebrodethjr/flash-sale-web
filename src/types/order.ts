import type { SaleProduct } from "@/lib/api";
import type { Product } from "./product";

export type Order = {
  id: number;
  uuid: string;
  order_reference: string;
  product?: Product;
  saleProduct?: SaleProduct;
  quantity: number;
  unit_price: string;
  total_amount: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};
