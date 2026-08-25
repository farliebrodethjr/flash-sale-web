import { Flame, FolderClock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useToken } from "@/hooks/token";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getTokenInfo } from "@/utils/token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function Header() {
  const { token, deleteToken } = useToken();
  const decodeToken = token ? getTokenInfo(token) : null;

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xl sm:text-2xl font-extrabold tracking-wide text-[#ad2a05]"
        >
          <Flame className="size-6 text-[#ad2a05] fill-current" />
          <span>FLASHDEAL</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  to="/history"
                  className="relative p-1.5 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <FolderClock className="size-6" />
                </Link>
              }
            />
            <TooltipContent>
              <p>Transaction History</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger
              className="cursor-pointer"
              render={
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {decodeToken
                        ? `${decodeToken.first_name?.charAt(0)?.toUpperCase() || ""}${decodeToken.last_name?.charAt(0)?.toUpperCase() || ""}`
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    deleteToken();
                    navigate("/login", { replace: true });
                  }}
                  variant="destructive"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
