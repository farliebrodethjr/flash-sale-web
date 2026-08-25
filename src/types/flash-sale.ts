import type { Product } from "./product";
import type { Sale } from "./sale";

export type FlashSale = {
  id: number;
  uuid: string;
  sale_id: number;
  product_id: number;
  discount_percentage: string;
  discount_price: string;
  created_at: string;
  updated_at: string;
  product: Product;
  sale: Sale;
};
