import { useNavigate } from "react-router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Flame } from "lucide-react";
import type { FlashSale } from "@/types/flash-sale";
import { formatDiscount, formatPrice } from "@/utils/string";
import { isEndingSoon } from "@/utils/date";

export type ActiveFlashSaleTabContentProps = {
  activeDeals: FlashSale[];
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

export default function ActiveFlashSaleTabContent({
  activeDeals,
}: ActiveFlashSaleTabContentProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      {activeDeals.map((deal) => {
        const stock = deal.product?.stock ?? 0;
        const endingSoon = isEndingSoon(deal.sale.end_date);

        return (
          <Card
            key={deal.uuid}
            className="flex flex-col justify-between rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/80 hover:shadow-md transition-shadow ring-0 gap-0"
          >
            {/* Product Image & Badges */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#eceef0] flex items-center justify-center">
              {/* Discount Percentage Badge */}
              <div className="absolute left-2.5 top-2.5 z-10 rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-2xs bg-[#ad2a05]">
                {formatDiscount(deal.discount_percentage)}
              </div>

              {/* Ending Soon Urgency Tag */}
              {endingSoon && (
                <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1 rounded-sm bg-rose-600/90 text-white px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-2xs backdrop-blur-xs">
                  <Timer className="size-3" />
                  <span>Ending Soon</span>
                </div>
              )}

              <img
                src={deal.product?.image_url || FALLBACK_IMG}
                alt={deal.product?.name || "Flash Sale Deal"}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                }}
                className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>

            <CardContent className="p-0 mt-4 flex-1 flex flex-col justify-between">
              <div>
                <CardTitle
                  className="text-base font-bold text-neutral-900 line-clamp-1"
                  title={deal.product?.name}
                >
                  {deal.product?.name || "Flash Sale Product"}
                </CardTitle>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#ad2a05]">
                    ${formatPrice(deal.discount_price)}
                  </span>
                  {deal.product?.price && (
                    <span className="text-xs text-neutral-400 line-through">
                      ${formatPrice(deal.product.price)}
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="uppercase tracking-tight text-[#ad2a05] flex items-center gap-1">
                      {stock > 0 && (stock <= 5 || endingSoon) && (
                        <Flame className="size-3.5 fill-[#ad2a05]" />
                      )}
                      {stock === 0
                        ? "SOLD OUT"
                        : endingSoon || stock <= 5
                          ? `LAST CHANCE • ONLY ${stock} LEFT!`
                          : `ONLY ${stock} LEFT!`}
                    </span>
                  </div>
                </div>
              </div>

              {/* BUY NOW Button */}
              <Button
                onClick={() => navigate(`/deals/${deal.uuid}`)}
                disabled={stock === 0}
                className="mt-5 w-full h-11 rounded-lg bg-[#ad2a05] hover:bg-[#962303] text-white font-bold text-sm uppercase tracking-wider shadow-xs cursor-pointer active:scale-[0.99]"
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
