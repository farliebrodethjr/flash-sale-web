import { omitEmptyParams } from "@/utils/payload";
import httpClient from "./http-client";
import type { User } from "@/types/user";

export type LoginInput = {
  email: string;
  password: string;
};

export function login(input: LoginInput): Promise<User> {
  const payload = omitEmptyParams(input);
  const urlEndpoint = `auth/login`;
  return httpClient.post(urlEndpoint, payload).then((r) => r.data.data);
}
