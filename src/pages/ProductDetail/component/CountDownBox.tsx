import { formatDigits } from "@/utils/string";
import type { TimeLeft } from "@/types/sale";

type CountDownBoxProps = {
  timeLeft: TimeLeft;
};

export default function CountDownBox({ timeLeft }: CountDownBoxProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-bold">
      {timeLeft.days > 0 && (
        <>
          <div className="flex flex-col items-center">
            <span className="rounded-lg bg-neutral-900 text-white px-2 py-1 min-w-7 text-center font-mono">
              {formatDigits(timeLeft.days)}
            </span>
            <span className="text-[9px] text-neutral-400 font-semibold uppercase mt-0.5">
              days
            </span>
          </div>
          <span className="font-bold text-neutral-900 -mt-2">:</span>
        </>
      )}
      <div className="flex flex-col items-center">
        <span className="rounded-lg bg-neutral-900 text-white px-2 py-1 min-w-7 text-center font-mono">
          {formatDigits(timeLeft.hours)}
        </span>
        <span className="text-[9px] text-neutral-400 font-semibold uppercase mt-0.5">
          hrs
        </span>
      </div>
      <span className="font-bold text-neutral-900 -mt-2">:</span>
      <div className="flex flex-col items-center">
        <span className="rounded-lg bg-neutral-900 text-white px-2 py-1 min-w-7 text-center font-mono">
          {formatDigits(timeLeft.minutes)}
        </span>
        <span className="text-[9px] text-neutral-400 font-semibold uppercase mt-0.5">
          min
        </span>
      </div>
      <span className="font-bold text-neutral-900 -mt-2">:</span>
      <div className="flex flex-col items-center">
        <span className="rounded-lg bg-neutral-900 text-white px-2 py-1 min-w-7 text-center font-mono">
          {formatDigits(timeLeft.seconds)}
        </span>
        <span className="text-[9px] text-neutral-400 font-semibold uppercase mt-0.5">
          sec
        </span>
      </div>
    </div>
  );
}
