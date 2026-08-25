import { create } from "zustand";
import type { TransactionHistoryState } from "./useTransactionHistorySlice";
import { createTransactionHistorySlice } from "./useTransactionHistorySlice";

type BoundState = TransactionHistoryState;

export const useBoundStore = create<BoundState>()((...a) => ({
  ...createTransactionHistorySlice(...a),
}));
