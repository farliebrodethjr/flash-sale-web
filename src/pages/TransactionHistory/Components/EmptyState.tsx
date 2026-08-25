import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Order } from "@/types/order";
import { PackageOpen } from "lucide-react";
import { Link } from "react-router";

type EmptyStateProps = {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
};

export default function EmptyState({
  isLoading,
  isError,
  orders,
}: EmptyStateProps) {
  return (
    <>
      {!isLoading && !isError && orders.length === 0 && (
        <Card className="mt-8 rounded-2xl bg-white p-12 text-center border border-neutral-200 max-w-full mx-auto">
          <PackageOpen className="mx-auto size-12 text-neutral-300 mb-3" />
          <CardHeader className="text-lg font-bold text-neutral-800">
            <CardTitle>No Orders Yet</CardTitle>
          </CardHeader>
          <CardContent className="mt-1 text-sm text-neutral-500 max-w-md mx-auto">
            You haven't placed any flash sale orders yet. Check out our ongoing
            deals before they run out!
          </CardContent>

          <CardFooter className="bg-transparent flex justify-center">
            <Link to="/" className="inline-block">
              <Button className="bg-[#ad2a05] hover:bg-[#962303] text-white font-bold text-sm px-6 py-2.5 rounded-xl cursor-pointer shadow-xs">
                Explore Flash Deals
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
