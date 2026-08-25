import { setHeaderAuth } from "@/api/http-client";
import { useToken } from "@/hooks/token";
import { isTokenExpired } from "@/utils/token";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
  children: JSX.Element;
};

function RedirectLogin() {
  const location = useLocation();
  const state = { from: location };
  return <Navigate to="/login" state={state} />;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useToken();

  if (!token || isTokenExpired(token)) {
    return <RedirectLogin />;
  }

  setHeaderAuth(token);

  return children;
}
