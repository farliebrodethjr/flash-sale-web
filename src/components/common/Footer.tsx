import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-8 mt-auto">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Flame className="size-4 text-[#ad2a05]" />
          <span className="font-extrabold text-[#ad2a05]">FLASHDEAL</span>
          <span>— Fast, fair flash drops.</span>
        </div>
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} FLASHDEAL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
