import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useBoundStore } from "@/store/useBoundStore";
import { FilterX } from "lucide-react";

type FilterEmptyStateProps = {
  onClearFilters?: () => void;
};

export default function FilterEmptyState({
  onClearFilters,
}: FilterEmptyStateProps) {
  const { setFilter } = useBoundStore();

  const handleClear = () => {
    setFilter({ q: "", status: "All Statuses" });
    onClearFilters?.();
  };

  return (
    <>
      <Card className="mt-8 rounded-2xl bg-white p-12 text-center border border-neutral-200 shadow-xs">
        <FilterX className="mx-auto size-12 text-neutral-300 mb-3" />
        <CardContent className="text-neutral-500 text-sm font-medium">
          No orders match your filter criteria.
        </CardContent>
        <CardFooter className="flex justify-center bg-transparent">
          <Button
            variant="outline"
            onClick={handleClear}
            className="mt-4 text-xs font-semibold text-neutral-700 border-neutral-300 hover:bg-neutral-50 cursor-pointer"
          >
            Clear Filters
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
