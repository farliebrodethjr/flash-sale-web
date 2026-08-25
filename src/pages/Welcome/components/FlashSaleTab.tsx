import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Activity, Check, Rocket } from "lucide-react";
import ActiveFlashSaleTabContent from "./ActiveFlashSaleTabContent";
import UpcomingFlashSaleTabContent from "./UpcomingFlashSaleTabContent";
import EndingFlashSaleTabContent from "./EndingFlashSaleTabContent";
import LoadingSkeleton from "./LoadingSkeleton";
import type { FlashSale } from "@/types/flash-sale";

export type FlashSaleTabProps = {
  activeTab: "active" | "upcoming" | "ending";
  onTabChange: (tab: "active" | "upcoming" | "ending") => void;
  currentDeals: FlashSale[];
  isLoading: boolean;
};

export default function FlashSaleTab({
  activeTab,
  onTabChange,
  currentDeals,
  isLoading,
}: FlashSaleTabProps) {
  return (
    <Tabs
      defaultValue="active"
      value={activeTab}
      onValueChange={(val) =>
        onTabChange(val as "active" | "upcoming" | "ending")
      }
      className="mt-8 sm:mt-10"
    >
      <TabsList className="flex w-full justify-start gap-6 sm:gap-12 md:gap-16 bg-transparent border-b border-neutral-200 rounded-none h-auto p-0 flex-wrap sm:flex-nowrap">
        <TabsTrigger
          value="active"
          className={cn(
            "group relative flex items-center gap-2 pb-3 text-left rounded-none!",
            "bg-transparent! shadow-none! outline-none! ring-0!",
            "border-0! data-active:border-b-2! data-active:border-[#ad2a05]!",
            "text-neutral-500 hover:text-neutral-700",
            "data-active:text-neutral-900",
            "data-active:font-bold",
          )}
        >
          <Activity className="size-4 group-data-active:text-[#ad2a05]" />

          <div>
            <span className="block text-sm sm:text-base font-bold leading-tight">
              Active Now
            </span>

            <span className="block text-[10px] font-bold tracking-wider uppercase group-data-active:text-[#ad2a05]">
              LIVE DEALS
            </span>
          </div>
        </TabsTrigger>

        <TabsTrigger
          value="upcoming"
          className={cn(
            "group relative flex items-center gap-2 pb-3 text-left rounded-none!",
            "bg-transparent! shadow-none! outline-none! ring-0!",
            "border-0! data-active:border-b-2! data-active:border-[#ad2a05]!",
            "text-neutral-500 hover:text-neutral-700",
            "data-active:text-neutral-900",
            "data-active:font-bold",
          )}
        >
          <Rocket className="size-4 group-data-active:text-[#ad2a05]" />

          <div>
            <span className="block text-sm sm:text-base font-bold leading-tight">
              Coming Soon
            </span>

            <span className="block text-[10px] font-bold tracking-wider group-data-active:text-[#ad2a05] uppercase">
              UPCOMING DROPS
            </span>
          </div>
        </TabsTrigger>

        <TabsTrigger
          value="ending"
          className={cn(
            "group relative flex items-center gap-2 pb-3 text-left rounded-none!",
            "bg-transparent! shadow-none! outline-none! ring-0!",
            "border-0! data-active:border-b-2! data-active:border-[#ad2a05]!",
            "text-neutral-500 hover:text-neutral-700",
            "data-active:text-neutral-900",
            "data-active:font-bold",
          )}
        >
          <Check className="size-4 group-data-active:text-[#ad2a05]" />

          <div>
            <span className="block text-sm sm:text-base font-bold leading-tight">
              Sale Ended
            </span>

            <span className="block text-[10px] font-bold tracking-wider uppercase group-data-active:text-[#ad2a05]">
              Expired
            </span>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : (
          <ActiveFlashSaleTabContent activeDeals={currentDeals} />
        )}
      </TabsContent>
      <TabsContent value="ending">
        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : (
          <EndingFlashSaleTabContent endingDeals={currentDeals} />
        )}
      </TabsContent>
      <TabsContent value="upcoming">
        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : (
          <UpcomingFlashSaleTabContent upcomingDeals={currentDeals} />
        )}
      </TabsContent>
    </Tabs>
  );
}
