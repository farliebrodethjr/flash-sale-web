import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import * as api from "@/api/flash-sale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { FlashSale } from "@/types/flash-sale";
import type { TimeLeft } from "@/types/sale";

export type ProductCheckoutProps = {
  flashSale: FlashSale;
  isOutOfStock: boolean;
  isUpcoming: boolean;
  timeLeft: TimeLeft;
};

export default function ProductCheckout({
  flashSale,
  isOutOfStock,
  isUpcoming,
  timeLeft,
}: ProductCheckoutProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ uuid, quantity }: { uuid: string; quantity: number }) =>
      api.checkoutFlashSale(uuid, { quantity }),
    onSuccess: async (_, { uuid }) => {
      await queryClient.invalidateQueries({
        queryKey: ["FLASH_SALE_PRODUCT_DETAIL", uuid],
      });

      await queryClient.invalidateQueries({
        queryKey: ["FLASH_SALE_PRODUCTS"],
      });
    },
  });

  const handleAddToCart = async () => {
    toast.promise(
      mutation.mutateAsync({
        uuid: flashSale.uuid,
        quantity: 1,
      }),
      {
        loading: "Adding to cart...",
        success: () => {
          return "Order placed successfully!";
        },
        error: (error: any) => {
          return (
            error.response?.data?.message ||
            error.message ||
            "Checkout failed. Please try again."
          );
        },
      },
    );
    // if (!flashSale?.uuid) {
    //   toast.error("Invalid flash sale item.");
    //   return;
    // }

    // if (isOutOfStock) {
    //   toast.error("This item is currently sold out.");
    //   return;
    // }

    // if (isUpcoming) {
    //   toast.error("This flash sale has not started yet.");
    //   return;
    // }

    // try {
    //   const res = await checkoutMutation.mutateAsync({
    //     uuid: flashSale.uuid,
    //     quantity: 1,
    //   });

    //   toast.success(res.message || "Order placed successfully!", {
    //     icon: <CheckCircle2 className="size-5 text-emerald-500" />,
    //   });
    // } catch (err: unknown) {
    //   const msg = isAxiosError(err)
    //     ? err.response?.data?.message || err.message
    //     : err instanceof Error
    //       ? err.message
    //       : "Checkout failed. Please try again.";
    //   toast.error(msg);
  };

  return (
    <>
      {/* 1 Stock / Unit Limit Notice */}
      <div className="flex items-center justify-between rounded-xl bg-amber-50/80 border border-amber-200/80 px-4 py-2.5 text-xs text-amber-900 font-semibold shadow-2xs">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-amber-600 fill-amber-500 shrink-0" />
          <span>
            Limited to <strong>1 unit</strong> per customer
          </span>
        </div>
        <span className="rounded-md bg-amber-200/80 text-amber-900 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
          Qty: 1
        </span>
      </div>

      {/* Action Button */}
      <Button
        onClick={handleAddToCart}
        disabled={
          isOutOfStock || isUpcoming || timeLeft.isEnded || mutation.isPending
        }
        className="w-full h-13 rounded-xl bg-[#ad2a05] hover:bg-[#962303] text-white font-extrabold text-base uppercase tracking-wider shadow-sm cursor-pointer active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span>Processing</span>
          </>
        ) : isUpcoming ? (
          "Drop Not Started"
        ) : isOutOfStock ? (
          "Item Sold Out"
        ) : timeLeft.isEnded ? (
          "Sale Ended"
        ) : (
          <>
            <Zap className="size-5 fill-current" />
            <span>Claim Flash Deal (1 Unit)</span>
          </>
        )}
      </Button>
    </>
  );
}
