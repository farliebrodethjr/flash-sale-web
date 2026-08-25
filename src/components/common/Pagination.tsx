import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

function getPaginationItems(
  current: number,
  total: number,
  siblingCount = 1,
): (number | "...")[] {
  const totalPageNumbers = siblingCount + 5;

  if (total <= totalPageNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);

  // Don't show dots if there's only 1 position between sibling and boundary
  const shouldShowLeftDots = leftSiblingIndex > 3;
  const shouldShowRightDots = rightSiblingIndex < total - 2;

  const firstPageIndex = 1;
  const lastPageIndex = total;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => total - rightItemCount + i + 1,
    );
    return [firstPageIndex, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }

  return [];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePrev = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={`mt-12 flex items-center justify-center gap-2 sm:gap-2.5 ${className}`}
    >
      {/* Prev Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage <= 1 || isLoading}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/90 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
        aria-label="Previous Page"
      >
        <ChevronLeft className="size-4 stroke-[2.5]" />
      </button>

      {/* Page Items */}
      {paginationItems.map((item, idx) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-10 w-8 items-center justify-center text-sm font-bold text-neutral-400 select-none tracking-widest"
            >
              ...
            </span>
          );
        }

        const pageNum = item;
        const isActive = currentPage === pageNum;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => !isLoading && onPageChange(pageNum)}
            disabled={isLoading}
            className={`flex h-10 min-w-10 px-3 items-center justify-center rounded-xl font-bold text-sm cursor-pointer transition-all shadow-2xs ${
              isActive
                ? "bg-[#ad2a05] text-white shadow-xs"
                : "border border-neutral-200/90 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300"
            }`}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Page ${pageNum}`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages || isLoading}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/90 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
        aria-label="Next Page"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin text-[#ad2a05]" />
        ) : (
          <ChevronRight className="size-4 stroke-[2.5]" />
        )}
      </button>
    </nav>
  );
}

export default Pagination;
