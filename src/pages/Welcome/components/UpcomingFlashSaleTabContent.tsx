import { Link } from "react-router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FlashSale } from "@/types/flash-sale";
import { formatDiscount, formatPrice } from "@/utils/string";
import { formatAsReadableDate } from "@/utils/date";

export type UpcomingFlashSaleTabContentProps = {
  upcomingDeals: FlashSale[];
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

export default function UpcomingFlashSaleTabContent({
  upcomingDeals,
}: UpcomingFlashSaleTabContentProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      {upcomingDeals.map((deal) => (
        <Card
          key={deal.uuid}
          className="flex flex-col justify-between rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/80 hover:shadow-md transition-shadow ring-0 gap-0"
        >
          {/* Product Image & Blue Badge */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#eceef0] flex items-center justify-center">
            <div className="absolute left-2.5 top-2.5 z-10 rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-2xs bg-[#3b82f6]">
              {formatDiscount(deal.discount_percentage)}
            </div>

            {/* Launch Time Pill */}
            <div className="absolute right-2.5 bottom-2.5 z-10 rounded-sm bg-white/90 px-2 py-0.5 text-[10px] font-bold tracking-wide text-neutral-700 backdrop-blur-xs shadow-2xs uppercase">
              Starts At {formatAsReadableDate(deal.sale?.start_date)}
            </div>

            <img
              src={deal.product?.image_url || FALLBACK_IMG}
              alt={deal.product?.name}
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
                <span className="text-xl sm:text-2xl font-extrabold text-[#2563eb]">
                  ${formatPrice(deal.discount_price)}
                </span>
                {deal.product?.price && (
                  <span className="text-xs text-neutral-400 line-through">
                    ${formatPrice(deal.product.price)}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="uppercase tracking-tight text-neutral-400">
                    COMING SOON
                  </span>
                </div>
              </div>
            </div>

            {/* REMIND ME CTA */}
            <Link
              to={`/deals/${deal.uuid || deal.id}`}
              className="mt-5 block w-full"
            >
              <Button
                variant="outline"
                className="w-full h-11 rounded-lg border border-[#ad2a05] text-[#ad2a05] hover:bg-red-50 bg-transparent font-bold text-sm uppercase tracking-wider shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                VIEW PRODUCT
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
