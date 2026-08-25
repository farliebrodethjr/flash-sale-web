import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import * as api from "@/api/auth";
import { useLocation, useNavigate } from "react-router";
import { useToken } from "@/hooks/token";
import toast from "react-hot-toast";
import type { User } from "@/types/user";

const FormSchema = z.object({
  email: z
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
});

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: api.login,
    onSuccess: (response: User) => {
      setToken(response.token);
      navigate(location.state?.from ?? "/");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.",
      );
    },
  });

  function onSubmit(data: z.output<typeof FormSchema>) {
    mutation.mutate(data);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f1f3f5] p-4 sm:p-6">
      <Card className="w-full max-w-115 rounded-2xl bg-white p-8 sm:p-10 shadow-sm border border-neutral-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-wide text-[#ad2a05]">
            FLASHDEAL
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-neutral-600">
            Welcome back. Sign in to access your deals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-login-flashsale"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8"
          >
            <FieldGroup className="space-y-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-0">
                    <FieldLabel
                      className={cn(
                        "block text-xs sm:text-sm font-semibold text-neutral-900 mb-1.5",
                        fieldState.error && "text-red-500",
                      )}
                    >
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      name="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={cn(
                        "h-12 rounded-lg bg-[#f9fafb] px-4 text-sm focus-visible:border-[#ad2a05] focus-visible:ring-[#ad2a05]/20",
                        fieldState.error && "aria-invalid:border-red-500",
                      )}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="mt-2"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-0">
                    <FieldLabel
                      className={cn(
                        "block text-xs sm:text-sm font-semibold text-neutral-900 mb-1.5",
                        fieldState.error && "text-red-500",
                      )}
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className={cn(
                          "h-12 rounded-lg bg-[#f9fafb] pl-4 pr-11 text-sm focus-visible:border-[#ad2a05] focus-visible:ring-[#ad2a05]/20",
                          fieldState.error && "aria-invalid:border-red-500",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer p-1 transition-colors"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="mt-2"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              form="form-login-flashsale"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ad2a05] text-sm sm:text-base font-bold tracking-wider text-white shadow-xs transition-all duration-150 hover:bg-[#962303] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              LOGIN <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
