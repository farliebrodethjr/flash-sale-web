import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <Card className="lg:col-span-6 rounded-2xl bg-white border border-neutral-200/90 p-8 min-h-110 flex items-center justify-center">
        <CardContent>
          <Skeleton className="size-64 rounded-xl bg-neutral-200" />
        </CardContent>
      </Card>

      <div className="lg:col-span-6 space-y-6">
        <Skeleton className="h-6 w-1/4 bg-neutral-200 rounded" />
        <Skeleton className="h-10 w-3/4 bg-neutral-200 rounded" />
        <Skeleton className="h-20 w-full bg-neutral-200 rounded-xl" />
        <Skeleton className="h-28 w-full bg-neutral-200 rounded-xl" />
        <Skeleton className="h-14 w-full bg-neutral-200 rounded-xl" />
      </div>
    </div>
  );
}
