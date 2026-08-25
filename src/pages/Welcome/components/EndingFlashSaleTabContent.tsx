import { useNavigate } from "react-router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Ban } from "lucide-react";
import type { FlashSale } from "@/types/flash-sale";
import { formatDiscount, formatPrice } from "@/utils/string";

export type EndingFlashSaleTabContentProps = {
  endingDeals: FlashSale[];
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

export default function EndingFlashSaleTabContent({
  endingDeals,
}: EndingFlashSaleTabContentProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      {endingDeals.map((deal) => {
        return (
          <Card
            key={deal.uuid}
            className="flex flex-col justify-between rounded-xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 hover:shadow-md transition-all ring-0 gap-0 opacity-90"
          >
            {/* Product Image & Expired Badges */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#eceef0] flex items-center justify-center">
              {/* Expired Tag */}
              <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-sm bg-neutral-800/90 text-white px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-2xs backdrop-blur-xs">
                <Ban className="size-3" />
                <span>Deal Ended</span>
              </div>

              {/* Missed Discount Badge */}
              {deal.discount_percentage && (
                <div className="absolute right-2.5 top-2.5 z-10 rounded-sm bg-neutral-200/90 text-neutral-700 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-2xs backdrop-blur-xs">
                  Was {formatDiscount(deal.discount_percentage)}
                </div>
              )}

              <img
                src={deal.product?.image_url || FALLBACK_IMG}
                alt={deal.product?.name || "Flash Sale Deal"}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                }}
                className="h-full w-full object-cover object-center grayscale contrast-75 opacity-70 transition-transform duration-300 hover:scale-105"
              />
            </div>

            <CardContent className="p-0 mt-4 flex-1 flex flex-col justify-between">
              <div>
                <CardTitle
                  className="text-base font-bold text-neutral-700 line-clamp-1"
                  title={deal.product?.name}
                >
                  {deal.product?.name || "Flash Sale Product"}
                </CardTitle>

                {/* Price Display */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-neutral-600">
                    ${formatPrice(deal.product?.price || deal.discount_price)}
                  </span>
                  {deal.discount_price && deal.product?.price && (
                    <span className="text-xs text-neutral-400 line-through">
                      ${formatPrice(deal.discount_price)} (Flash)
                    </span>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-500">
                    <span className="uppercase tracking-tight flex items-center gap-1.5">
                      <Clock className="size-3.5 text-neutral-400" />
                      Flash sale has expired
                    </span>
                  </div>
                </div>
              </div>

              {/* View Product CTA */}
              <Button
                variant="outline"
                onClick={() => navigate(`/deals/${deal.uuid}`)}
                className="mt-5 w-full h-11 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 bg-white font-bold text-sm uppercase tracking-wider shadow-2xs cursor-pointer active:scale-[0.99]"
              >
                VIEW PRODUCT
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
