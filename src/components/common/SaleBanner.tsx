import { useState, useEffect, useMemo } from "react";
import { Loader2, Sparkles, Clock, Flame, Bell } from "lucide-react";
import type { Sale } from "@/types/sale";
import { formatSaleDate } from "@/utils/date";

type SaleBannerProps = {
  className?: string;
  previewMode?: "upcoming" | "active";
  activeSale?: Sale;
  isError: boolean;
  isLoading: boolean;
};

export function SaleBanner({
  className = "",
  previewMode,
  activeSale,
  isError,
  isLoading,
}: SaleBannerProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isUpcoming = useMemo(() => {
    if (previewMode === "upcoming") return true;
    if (previewMode === "active") return false;
    if (!activeSale) return false;
    if (activeSale.type === "upcoming") return true;
    if (activeSale.start_date) {
      const startTime = new Date(activeSale.start_date).getTime();
      if (!isNaN(startTime) && startTime > now) {
        return true;
      }
    }
    return false;
  }, [activeSale, now, previewMode]);

  const { days, hours, minutes, seconds, isEnded } = useMemo(() => {
    if (previewMode === "upcoming") {
      const targetTime = activeSale?.start_date
        ? new Date(activeSale.start_date).getTime()
        : now + (2 * 24 * 3600 + 14 * 3600 + 35 * 60 + 20) * 1000;
      const diff = Math.max(0, targetTime - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds, isEnded: false };
    }

    if (!activeSale) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const targetDateStr = isUpcoming
      ? activeSale.start_date
      : activeSale.end_date;

    const targetTime = targetDateStr ? new Date(targetDateStr).getTime() : NaN;

    if (isNaN(targetTime)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const diff = Math.max(0, targetTime - now);
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isEnded: false };
  }, [activeSale, isUpcoming, now, previewMode]);

  const formatDigits = (val: number) => String(val).padStart(2, "0");

  // Loading State
  if (isLoading) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#0a0604] p-6 sm:p-10 text-center shadow-xl border border-neutral-900 flex flex-col items-center justify-center min-h-55 ${className}`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-linear-to-br from-[#ad2a05]/20 to-transparent blur-3xl opacity-50" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-linear-to-tl from-[#e05a10]/20 to-transparent blur-3xl opacity-50" />
        </div>
        <Loader2 className="size-8 animate-spin text-[#ad2a05] mb-2" />
        <p className="text-xs text-neutral-400 font-medium">
          Loading sale schedule...
        </p>
      </div>
    );
  }

  // No active or upcoming sale / Ended State
  if (
    previewMode !== "upcoming" &&
    (isError || !activeSale || (isEnded && !isUpcoming))
  ) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#0b0c10] p-6 sm:p-10 text-center shadow-xl border border-neutral-800 ${className}`}
      >
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-linear-to-br from-amber-600/15 to-transparent blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-linear-to-tl from-indigo-600/15 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-black/80" />
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,#ffffff_1px,transparent_1px),linear-gradient(-45deg,#ffffff_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-neutral-800/80 border border-neutral-700/70 px-3 py-1 text-[11px] font-bold tracking-widest text-neutral-300 uppercase">
            <Sparkles className="size-3.5 text-amber-400" />
            STAY TUNED
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-md">
            Next Flash Drop Coming Soon
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-md">
            There are currently no live sales active right now. Check back soon
            or browse upcoming drops below for exclusive deals!
          </p>
        </div>
      </div>
    );
  }

  // 1. UPCOMING SALE DESIGN (Electric Blue / Indigo Theme)
  if (isUpcoming) {
    const title = activeSale?.title || "CYBER MIDNIGHT FLASH DROP";
    const startDateFormatted = activeSale?.start_date
      ? formatSaleDate(activeSale.start_date)
      : "";

    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#060a14] p-6 sm:p-10 text-center shadow-xl border border-blue-950/80 ${className}`}
      >
        {/* Futuristic Electric Blue Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-linear-to-br from-blue-600/35 to-transparent blur-3xl opacity-70" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-linear-to-tl from-indigo-600/35 to-transparent blur-3xl opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-black/85" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(45deg,#2563eb_1px,transparent_1px),linear-gradient(-45deg,#3b82f6_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>

        {/* Banner Inner Content */}
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          {/* Status Tag */}
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-blue-500/20 border border-blue-400/40 px-3 py-1 text-[11px] font-extrabold tracking-widest text-blue-400 uppercase">
            <Clock className="size-3.5" />
            UPCOMING DROP • STARTS IN:
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-md">
            {title}
          </h1>

          {/* Countdown Timer Display (Blue Digit Boxes) */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-black/65 px-4 py-3 backdrop-blur-md border border-blue-400/20 shadow-2xl">
            {/* Days (if > 0) */}
            {days > 0 && (
              <>
                <div className="flex flex-col items-center">
                  <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 px-2 items-center justify-center rounded-lg bg-[#2563eb] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
                    {formatDigits(days)}
                  </div>
                  <span className="mt-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase">
                    DAYS
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white mb-4">
                  :
                </span>
              </>
            )}

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 items-center justify-center rounded-lg bg-[#2563eb] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
                {formatDigits(hours)}
              </div>
              <span className="mt-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase">
                HOURS
              </span>
            </div>

            <span className="text-xl sm:text-2xl font-bold text-white mb-4">
              :
            </span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 items-center justify-center rounded-lg bg-[#2563eb] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
                {formatDigits(minutes)}
              </div>
              <span className="mt-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase">
                MINS
              </span>
            </div>

            <span className="text-xl sm:text-2xl font-bold text-white mb-4">
              :
            </span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 items-center justify-center rounded-lg bg-[#2563eb] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
                {formatDigits(seconds)}
              </div>
              <span className="mt-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase">
                SECS
              </span>
            </div>
          </div>

          {/* Launch Date Subtitle */}
          {startDateFormatted && (
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300/90">
              <Bell className="size-3.5 text-blue-400" />
              <span>Launches {startDateFormatted}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. ACTIVE LIVE SALE DESIGN (Fiery Amber / Red Theme)
  const title = activeSale?.title || "MIDNIGHT MEGA SALE";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#0a0604] p-6 sm:p-10 text-center shadow-xl border border-neutral-900 ${className}`}
    >
      {/* Dynamic Geometric / Fiery Facet Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-linear-to-br from-[#ad2a05]/40 to-transparent blur-3xl opacity-70" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-linear-to-tl from-[#e05a10]/40 to-transparent blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-black/80" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,#ad2a05_1px,transparent_1px),linear-gradient(-45deg,#e05a10_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Banner Inner Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        {/* Sale Status Tag */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-[#b8860b]/30 border border-[#eab308]/40 px-3 py-1 text-[11px] font-extrabold tracking-widest text-[#eab308] uppercase">
          <Flame className="size-3.5 text-[#eab308] fill-current" />
          LIVE NOW • ENDS IN:
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-md">
          {title}
        </h1>

        {/* Countdown Timer Display */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-black/60 px-4 py-3 backdrop-blur-md border border-white/10 shadow-2xl">
          {/* Days (if > 0) */}
          {days > 0 && (
            <>
              <div className="flex flex-col items-center">
                <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 px-2 items-center justify-center rounded-lg bg-[#ad2a05] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
                  {formatDigits(days)}
                </div>
                <span className="mt-1 text-[9px] font-bold tracking-wider text-neutral-300 uppercase">
                  DAYS
                </span>
              </div>

              <span className="text-xl sm:text-2xl font-bold text-white mb-4">
                :
              </span>
            </>
          )}

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 items-center justify-center rounded-lg bg-[#ad2a05] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
              {formatDigits(hours)}
            </div>
            <span className="mt-1 text-[9px] font-bold tracking-wider text-neutral-300 uppercase">
              HOURS
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-white mb-4">
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 items-center justify-center rounded-lg bg-[#ad2a05] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
              {formatDigits(minutes)}
            </div>
            <span className="mt-1 text-[9px] font-bold tracking-wider text-neutral-300 uppercase">
              MINS
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-white mb-4">
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="flex h-11 sm:h-12 min-w-11 sm:min-w-12 items-center justify-center rounded-lg bg-[#ad2a05] text-xl sm:text-2xl font-extrabold text-white shadow-inner">
              {formatDigits(seconds)}
            </div>
            <span className="mt-1 text-[9px] font-bold tracking-wider text-neutral-300 uppercase">
              SECS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleBanner;
