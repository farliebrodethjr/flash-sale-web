import { Link } from "react-router";
import { CheckCircle2, Clock, XCircle, ExternalLink } from "lucide-react";
import type { Order } from "@/types/order";
import { formatAsReadableDate } from "@/utils/date";
import { formatPrice } from "@/utils/string";
import { FAILED, PAID, PENDING } from "@/utils/const";
import { Card, CardContent } from "@/components/ui/card";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80";

type TransactionContentProps = {
  orders: Order[];
};

export default function TransactionContent({
  orders,
}: TransactionContentProps) {
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case PAID:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="size-3.5 text-emerald-600" />
            Paid
          </span>
        );
      case PENDING:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
            <Clock className="size-3.5 text-amber-600" />
            Pending
          </span>
        );
      case FAILED:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 border border-neutral-200">
            <XCircle className="size-3.5 text-neutral-500" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 border border-neutral-200">
            {status || "Unknown"}
          </span>
        );
    }
  };

  const getStripeColor = (status?: string) => {
    switch (status) {
      case PAID:
        return "bg-emerald-500";
      case PENDING:
        return "bg-[#ad2a05]";
      case FAILED:
        return "bg-neutral-300";
      default:
        return "bg-neutral-300";
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {orders.map((order) => {
        const productName =
          order.product?.name ||
          order.saleProduct?.product?.name ||
          "Flash Sale Product";
        const imageUrl =
          order.product?.image_url ||
          order.saleProduct?.product?.image_url ||
          FALLBACK_IMG;
        const orderDate = order.created_at
          ? formatAsReadableDate(order.created_at)
          : "Recent";
        const dealUuid = order.saleProduct?.uuid || order.product?.uuid;

        return (
          <Card
            key={order.uuid}
            className="border-none relative flex flex-col sm:flex-row sm:items-center justify-between overflow-hidden rounded-xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 transition-all hover:shadow-sm gap-4"
          >
            {/* Status indicator stripe on left edge */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1.5 ${getStripeColor(
                order.status,
              )}`}
            />

            {/* Left Side: Product Image & Details */}
            <CardContent className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4 pl-2 sm:pl-3">
                {/* Product Thumbnail */}
                <div className="size-14 sm:size-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200/70 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={productName}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                    }}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Metadata */}
                <div>
                  <div className="text-xs font-semibold text-neutral-500 flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono font-bold text-neutral-700">
                      TRANSACTION REFERENCE:{" "}
                      {(
                        order.order_reference ||
                        order.uuid?.slice(0, 8) ||
                        ""
                      ).toUpperCase()}
                    </span>
                    <span>•</span>
                    <span>{orderDate}</span>
                  </div>

                  <h2
                    className={`mt-0.5 text-base sm:text-lg font-bold line-clamp-1 ${
                      order.status === FAILED
                        ? "text-neutral-500 line-through"
                        : "text-neutral-900"
                    }`}
                    title={productName}
                  >
                    {productName}
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                    <span>
                      Quantity:{" "}
                      <strong className="text-neutral-800">
                        {order.quantity || 1}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Unit Price:{" "}
                      <strong className="text-neutral-800">
                        ${formatPrice(order.unit_price || order.total_amount)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Total Price & Status Badge & Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-2 sm:pl-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100 gap-2">
                <div className="flex flex-col sm:items-end">
                  <span
                    className={`text-xl sm:text-2xl font-black tracking-tight ${
                      order.status === FAILED
                        ? "text-neutral-400 line-through"
                        : "text-neutral-900"
                    }`}
                  >
                    ${formatPrice(order.total_amount || order.unit_price)}
                  </span>
                  <div className="mt-1">{getStatusBadge(order.status)}</div>
                </div>

                {dealUuid && (
                  <Link
                    to={`/deals/${dealUuid}`}
                    className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-[#ad2a05] hover:underline mt-1"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="size-3" />
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
