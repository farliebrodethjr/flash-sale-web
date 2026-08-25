import { Card } from "@/components/ui/card";
import { Search, ChevronDown, ShoppingBag } from "lucide-react";
import { useBoundStore } from "@/store/useBoundStore";
import { FAILED, PAID, PENDING } from "@/utils/const";

export default function TransactionHistoryHeaderFilter() {
  const { filter, setFilter } = useBoundStore();

  return (
    <Card className="rounded-2xl bg-white/80 backdrop-blur-md border border-neutral-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-6 text-[#ad2a05]" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Transaction History
          </h1>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          Review your recent flash sale purchases and order statuses.
        </p>
      </div>

      {/* Controls: Search and Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Orders Input */}
        <div className="relative min-w-55">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <input
            type="text"
            value={filter.q ?? ""}
            onChange={(e) => setFilter({ ...filter, q: e.target.value })}
            placeholder="Search orders or products..."
            className="h-10 w-full rounded-xl border bg-white pl-9 pr-3.5 text-xs sm:text-sm text-neutral-800 focus:border-[#ad2a05] focus:outline-none focus:ring-2 focus:ring-[#ad2a05]/20 shadow-2xs"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <select
            value={filter.status ?? "All Statuses"}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="h-10 appearance-none rounded-xl border bg-white pl-3.5 pr-9 text-xs sm:text-sm font-medium text-neutral-700 focus:border-[#ad2a05] focus:outline-none focus:ring-2 focus:ring-[#ad2a05]/20 shadow-2xs cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value={PAID}>Paid</option>
            <option value={PENDING}>Pending</option>
            <option value={FAILED}>Failed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        </div>
      </div>
    </Card>
  );
}

