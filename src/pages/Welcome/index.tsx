import { useState } from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Header from "@/components/common/Header";
import SaleBanner from "@/components/common/SaleBanner";
import Pagination from "@/components/common/Pagination";
import Footer from "@/components/common/Footer";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useFlashSales } from "@/hooks/flash-sale";
import FlashSaleTab from "./components/FlashSaleTab";
import EmptyState from "./components/EmptyState";
import { useActiveSale } from "@/hooks/sale";

const PAGE_SIZE = 6;

export function WelcomePage() {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "ending">(
    "active",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: activeSale,
    isLoading: isActiveSaleLoading,
    isError: isActiveSaleError,
  } = useActiveSale();

  const {
    data: flashSaleProductData,
    isLoading: isFlashSaleProductLoading,
    isPlaceholderData,
    isError: isFlashSaleProductError,
    error,
    refetch,
  } = useFlashSales({
    sale_status: activeTab,
    page: currentPage,
    take: PAGE_SIZE,
    sale_uuid: activeTab === "active" ? activeSale?.uuid : undefined,
  });

  const handleTabChange = (tab: "active" | "upcoming" | "ending") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const currentDeals = flashSaleProductData?.data ?? [];
  const totalPages = flashSaleProductData?.meta?.total_pages ?? 1;

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="flex-1 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8">
            {/* Active Sale Item Hero Banner */}
            <SaleBanner
              activeSale={activeSale}
              isLoading={isActiveSaleLoading}
              isError={isActiveSaleError}
            />

            {/* Filter Status Tabs (Active Now / Coming Soon) */}
            <FlashSaleTab
              activeTab={activeTab}
              onTabChange={handleTabChange}
              currentDeals={currentDeals}
              isLoading={isFlashSaleProductLoading || isActiveSaleLoading}
            />

            {/* Error State */}
            {(isFlashSaleProductError || isActiveSaleError) && (
              <ErrorMessage
                title="Failed to load flash sales"
                message={error}
                onRetry={() => refetch()}
              />
            )}

            {/* Empty State */}
            <EmptyState
              isLoading={isFlashSaleProductLoading || isActiveSaleLoading}
              isError={isFlashSaleProductError || isActiveSaleError}
              currentDeals={currentDeals}
            />

            {/* Pagination Controls */}
            {!isFlashSaleProductLoading &&
              !isActiveSaleLoading &&
              totalPages > 1 && (
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

export default WelcomePage;
