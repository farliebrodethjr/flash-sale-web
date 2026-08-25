import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Header from "@/components/common/Header";
import Pagination from "@/components/common/Pagination";
import Footer from "@/components/common/Footer";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useOrders } from "@/hooks/order";
import TransactionHistoryHeaderFilter from "./Components/TransactionHeaderFilter";
import LoadingSkeleton from "./Components/LoadingSkeleton";
import EmptyState from "./Components/EmptyState";
import FilterEmptyState from "./Components/FilterEmptyState";
import TransactionContent from "./Components/TransactionContent";
import { useBoundStore } from "@/store/useBoundStore";

const PAGE_SIZE = 6;

export function TransactionHistoryPage() {
  const { filter } = useBoundStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search query or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter.q, filter.status]);

  const {
    data: orderData,
    isLoading,
    isPlaceholderData,
    isError,
    error,
    refetch,
  } = useOrders({
    page: currentPage,
    take: PAGE_SIZE,
    q: filter.q?.trim() || undefined,
    status:
      filter.status && filter.status !== "All Statuses"
        ? filter.status
        : undefined,
  });

  const orders = orderData?.data ?? [];
  const totalPages = orderData?.meta?.total_pages ?? 1;
  const isFiltered = Boolean(
    (filter.q && filter.q.trim() !== "") ||
    (filter.status && filter.status !== "All Statuses"),
  );

  return (
    <ProtectedRoute>
      <>
        <Header />

        <main className="flex-1 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8">
            {/* Header Banner Card with Search and Filter */}
            <TransactionHistoryHeaderFilter />

            {/* Error State */}
            {isError && (
              <ErrorMessage
                title="Failed to load transaction history"
                message={error}
                onRetry={() => refetch()}
              />
            )}

            {/* Loading Skeletons */}
            {isLoading && <LoadingSkeleton />}

            {/* Empty State (when user has no orders and no filter) */}
            {!isFiltered && (
              <EmptyState
                isLoading={isLoading}
                isError={isError}
                orders={orders}
              />
            )}

            {/* Filtered Empty State (when filters are active but return 0 orders) */}
            {isFiltered && <FilterEmptyState />}

            {/* Transaction Orders List */}
            {!isLoading && !isError && orders.length > 0 && (
              <TransactionContent orders={orders} />
            )}

            {/* Pagination Controls */}
            {!isLoading && !isError && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                isLoading={isPlaceholderData}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </>
    </ProtectedRoute>
  );
}

export default TransactionHistoryPage;
