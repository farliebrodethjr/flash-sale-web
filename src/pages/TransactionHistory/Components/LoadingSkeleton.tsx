import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card
          key={i}
          className="rounded-xl bg-white p-5 border border-neutral-200 animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <CardContent className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-16 rounded-lg bg-neutral-200 shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-neutral-200 rounded" />
                <Skeleton className="h-5 w-48 bg-neutral-200 rounded" />
                <Skeleton className="h-3 w-24 bg-neutral-200 rounded" />
              </div>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
              <Skeleton className="h-6 w-20 bg-neutral-200 rounded" />
              <Skeleton className="h-5 w-24 bg-neutral-200 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
