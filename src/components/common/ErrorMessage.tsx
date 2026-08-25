import { AlertCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorMessageProps = {
  title?: string;
  message?: string | Error | null;
  onRetry?: () => void;
  retryLabel?: string;
  children?: React.ReactNode;
  className?: string;
};

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try Again",
  children,
  className,
}: ErrorMessageProps) {
  const displayMessage =
    message instanceof Error
      ? message.message
      : typeof message === "string" && message.trim() !== ""
        ? message
        : "Something went wrong while fetching data. Please try again.";

  return (
    <Card
      className={cn(
        "mt-8 rounded-xl border border-red-200 bg-red-50/70 p-6 ring-0 shadow-2xs",
        className,
      )}
    >
      <CardHeader className="p-0 items-center space-y-1 text-center">
        <AlertCircle className="size-8 text-red-500 mb-1 mx-auto" />
        <CardTitle className="text-base font-bold text-red-900">
          {title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-red-600 max-w-md mx-auto">
          {displayMessage}
        </CardDescription>
      </CardHeader>

      {(children || onRetry) && (
        <CardContent className="p-0 mt-4 flex items-center justify-center gap-3">
          {children ? (
            children
          ) : onRetry ? (
            <Button
              onClick={onRetry}
              className="bg-[#ad2a05] hover:bg-[#962303] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              {retryLabel}
            </Button>
          ) : null}
        </CardContent>
      )}
    </Card>
  );
}

export default ErrorMessage;
