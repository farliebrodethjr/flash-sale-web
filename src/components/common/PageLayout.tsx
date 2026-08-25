import { Outlet } from "react-router";
import { TooltipProvider } from "../ui/tooltip";

function PageLayout() {
  return (
    <div className="min-h-screen bg-[#f1f3f5] text-neutral-900 flex flex-col font-sans">
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </div>
  );
}

export default PageLayout;
