import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useFlashSaleDetail } from "@/hooks/flash-sale";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSkeleton from "./component/LoadingSkeleton";
import ProductGallery from "./component/ProductGallery";
import PurchaseAction from "./component/PurchaseAction";

export function ProductDetailPage() {
  const { id: routeUuid } = useParams<{ id: string }>();

  const {
    data: flashSale,
    isLoading,
    isError,
    error,
    refetch,
  } = useFlashSaleDetail(routeUuid ?? "");

  const isUpcoming = flashSale?.sale?.status === "upcoming";
  const stock = flashSale?.product?.stock ?? 0;
  const isOutOfStock = stock <= 0;

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="flex-1 py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#ad2a05] transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span>Back to Flash Sales</span>
              </Link>
            </div>

            {/* Error State */}
            {isError && (
              <ErrorMessage
                title="Flash Sale Item Not Found"
                message={
                  error instanceof Error
                    ? error.message
                    : "Unable to retrieve details for this flash sale. It may have expired or been removed."
                }
                onRetry={refetch}
              />
            )}

            {/* Loading Skeleton */}
            {isLoading && <LoadingSkeleton />}

            {/* Product Details Content */}
            {!isLoading && !isError && flashSale && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Product Image Gallery Card */}
                <ProductGallery
                  isUpcoming={isUpcoming}
                  isOutOfStock={isOutOfStock}
                  flashSale={flashSale}
                />

                {/* Right Column: Product Details & Flash Sale CTA */}
                <PurchaseAction
                  flashSale={flashSale}
                  isUpcoming={isUpcoming}
                  isOutOfStock={isOutOfStock}
                  onRefetch={refetch}
                />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </>
    </ProtectedRoute>
  );
}

export default ProductDetailPage;
