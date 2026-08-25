import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FlashSale } from "@/types/flash-sale";
import { PackageOpen } from "lucide-react";

type EmptyStateProps = {
  isLoading: boolean;
  isError: boolean;
  currentDeals: FlashSale[];
};

export default function EmptyState({
  isLoading,
  isError,
  currentDeals,
}: EmptyStateProps) {
  return (
    <>
      {!isLoading && !isError && currentDeals.length === 0 && (
        <Card className="mt-8 rounded-2xl bg-white p-12 text-center border border-neutral-200 max-w-full mx-auto">
          <PackageOpen className="mx-auto size-12 text-neutral-300 mb-3" />
          <CardHeader className="text-lg font-bold text-neutral-800">
            <CardTitle>No Active Deals Found</CardTitle>
          </CardHeader>
          <CardContent className="mt-1 text-sm text-neutral-500 max-w-md mx-auto">
            There are currently no flash sales in this section. Please check
            back soon for exciting limited-time discounts!
          </CardContent>
        </Card>
      )}
    </>
  );
}
