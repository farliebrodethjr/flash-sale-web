import type { StateCreator } from "zustand";

type Filter = {
  q?: string;
  status?: string;
};

export type TransactionHistoryState = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const createTransactionHistorySlice: StateCreator<
  TransactionHistoryState
> = (set) => ({
  filter: {
    q: "",
    status: "All Statuses",
  },
  setFilter: (filter: Filter) => set({ filter }),
});
