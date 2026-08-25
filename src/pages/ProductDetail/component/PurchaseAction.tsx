import { useState, useEffect, useMemo, useRef } from "react";
import { Flame, Timer } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { FlashSale } from "@/types/flash-sale";
import { formatPrice } from "@/utils/string";
import CountDownBox from "./CountDownBox";
import ProductCheckout from "./ProductCheckout";

export type PurchaseActionProps = {
  flashSale: FlashSale;
  isUpcoming: boolean;
  isOutOfStock: boolean;
  onRefetch?: () => void;
};

export default function PurchaseAction({
  flashSale,
  isUpcoming,
  isOutOfStock,
  onRefetch,
}: PurchaseActionProps) {
  const hasRefetchedRef = useRef(false);

  // Live real-time clock synced every second
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate live countdown timer based on sale start_date and end_date
  const timeLeft = useMemo(() => {
    if (!flashSale?.sale) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const targetDateStr = isUpcoming
      ? flashSale.sale.start_date
      : flashSale.sale.end_date;

    if (!targetDateStr) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const targetTime = new Date(targetDateStr).getTime();

    if (isNaN(targetTime)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const diff = targetTime - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isEnded: false };
  }, [flashSale?.sale, isUpcoming, now]);

  // When timer reaches zero, auto refetch to update status
  useEffect(() => {
    if (timeLeft.isEnded && !hasRefetchedRef.current && onRefetch) {
      hasRefetchedRef.current = true;
      onRefetch();
    }
  }, [timeLeft.isEnded, onRefetch]);

  const discountPriceNum = parseFloat(flashSale?.discount_price || "0");
  const originalPriceNum = parseFloat(flashSale?.product?.price || "0");
  const savingsAmount =
    originalPriceNum > discountPriceNum
      ? (originalPriceNum - discountPriceNum).toFixed(2)
      : null;

  const stock = flashSale?.product?.stock ?? 0;

  return (
    <div className="lg:col-span-6 flex flex-col space-y-6">
      {/* Category / Sale Tag */}
      {flashSale.sale?.title && (
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#ad2a05]">
          <Flame className="size-4 fill-current" />
          <span>{flashSale.sale.title}</span>
        </div>
      )}

      {/* Product Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {flashSale.product?.name || "Flash Sale Product"}
        </h1>
      </div>

      {/* Price Banner Card */}
      <Card className="rounded-xl bg-neutral-200/60 p-4 sm:p-5 border-0 shadow-none ring-0 gap-0">
        <CardContent className="p-0 flex items-baseline justify-between flex-wrap gap-3">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-[#ad2a05] tracking-tight">
              ${formatPrice(flashSale.discount_price)}
            </span>
            {flashSale.product?.price && (
              <span className="text-base sm:text-lg text-neutral-500 line-through font-semibold">
                ${formatPrice(flashSale.product.price)}
              </span>
            )}
          </div>

          {savingsAmount && (
            <span className="rounded-md bg-emerald-100 text-emerald-800 px-2.5 py-1 text-xs font-bold">
              Save ${savingsAmount}
            </span>
          )}
        </CardContent>
      </Card>

      {/* Limited Time Offer Card with Countdown */}
      <Card className="rounded-xl bg-white border border-neutral-200/90 p-5 shadow-xs ring-0 gap-0 space-y-4">
        {/* Header Row: Offer Badge & Countdown Box */}
        <CardContent className="px-0 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[#ad2a05] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
            <Timer className="size-4 stroke-[2.5]" />
            <span>
              {isUpcoming
                ? "Starts In"
                : timeLeft.isEnded
                  ? "Sale Ended"
                  : "Ending Soon"}
            </span>
          </div>

          {/* Digit Countdown Boxes */}
          {!timeLeft.isEnded && <CountDownBox timeLeft={timeLeft} />}
        </CardContent>

        {/* Stock Progress Bar */}
        <CardFooter className="px-0 bg-transparent space-y-2 pt-2 border-t border-neutral-100">
          <div className="w-full flex items-center justify-between text-xs font-bold">
            <span className="text-neutral-700 uppercase tracking-tight">
              Stock Availability
            </span>
            <span className={stock > 0 ? "text-[#ad2a05]" : "text-neutral-400"}>
              {stock > 0 ? `Only ${stock} items left!` : "Sold Out"}
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Primary CTA Checkout Button & Limit Notices */}
      <div className="space-y-5 pt-2">
        <ProductCheckout
          flashSale={flashSale}
          isOutOfStock={isOutOfStock}
          isUpcoming={isUpcoming}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
}
