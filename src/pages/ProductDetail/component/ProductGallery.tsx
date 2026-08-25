import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { FlashSale } from "@/types/flash-sale";
import { formatDiscount } from "@/utils/string";
import { Clock, RotateCcw, ShieldCheck, Truck, Zap } from "lucide-react";

type ProductGallery = {
  isUpcoming: boolean;
  isOutOfStock: boolean;
  flashSale: FlashSale;
};

export default function ProductGallery({
  isUpcoming,
  isOutOfStock,
  flashSale,
}: ProductGallery) {
  return (
    <div className="lg:col-span-6 flex flex-col">
      <Card className="relative rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 flex flex-col items-center justify-between min-h-105 sm:min-h-105">
        {/* Discount Badge */}
        <CardContent>
          <div
            className={`absolute right-6 top-6 z-10 rounded-md px-3 py-1 text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-2xs ${
              isUpcoming
                ? "bg-blue-100 text-blue-800"
                : "bg-[#fef08a] text-[#854d0e]"
            }`}
          >
            {formatDiscount(flashSale.discount_percentage)}
          </div>

          {/* Sale Type Pill */}
          <div className="absolute left-6 top-6 z-10">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                isUpcoming
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : isOutOfStock
                    ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                    : "bg-red-50 text-[#ad2a05] border border-red-200"
              }`}
            >
              {isUpcoming ? (
                <>
                  <Clock className="size-3" />
                  Upcoming Drop
                </>
              ) : isOutOfStock ? (
                "Sold Out"
              ) : (
                <>
                  <Zap className="size-3 fill-current" />
                  Live Deal
                </>
              )}
            </span>
          </div>

          {/* Main Product Image Display */}
          <div className="flex-1 w-full flex items-center justify-center py-6">
            <img
              src={flashSale.product?.image_url}
              alt={flashSale.product?.name || "Flash Sale Product"}
              className="max-h-80 sm:max-h-90 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Feature Guarantee Badges */}
          <CardFooter className="w-full bg-transparent grid grid-cols-3 gap-2 pt-4 border-t-0 border-neutral-100 text-center">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="size-6 text-[#ad2a05]" />
              <span className="text-[10px] font-semibold text-neutral-600">
                100% Genuine
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="size-6 text-[#ad2a05]" />
              <span className="text-[10px] font-semibold text-neutral-600">
                Fast Delivery
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="size-6 text-[#ad2a05]" />
              <span className="text-[10px] font-semibold text-neutral-600">
                30-Day Return
              </span>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
