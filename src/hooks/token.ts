import { getTokenExpiration } from "@/utils/token";
import Cookies from "js-cookie";

/**
 * Get token from cookies
 * @returns {string}
 */
function getToken(): string | undefined {
  return Cookies.get("token");
}

/**
 * Store token in cookies
 * @param {string} token jwt token
 */
function setToken(token: string): void {
  const exp = getTokenExpiration(token);
  Cookies.set("token", token, {
    secure: true,
    expires: new Date(exp * 1000),
    sameSite: "Strict",
    path: "/",
  });
}

function deleteToken(): void {
  Cookies.remove("token", { path: "/" });
}

type UseToken = {
  token?: string;
  setToken: (token: string) => void;
  deleteToken: () => void;
};

/**
 * Use token hook
 * @returns {string | undefined, (token: string) => void]}
 */
export function useToken(): UseToken {
  const token = getToken();
  return { token, setToken, deleteToken };
}
