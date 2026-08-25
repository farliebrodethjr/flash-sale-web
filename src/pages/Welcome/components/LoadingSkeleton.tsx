import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="flex flex-col justify-between rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/80 ring-0 gap-0 animate-pulse"
        >
          <Skeleton className="aspect-4/3 w-full rounded-lg bg-neutral-200" />
          <div className="mt-4 space-y-3">
            <Skeleton className="h-5 w-3/4 bg-neutral-200 rounded" />
            <Skeleton className="h-6 w-1/3 bg-neutral-200 rounded" />
            <Skeleton className="h-3 w-full bg-neutral-200 rounded" />
            <Skeleton className="h-11 w-full bg-neutral-200 rounded-lg mt-5" />
          </div>
        </Card>
      ))}
    </div>
  );
}
