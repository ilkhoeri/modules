"use server";

import { cookies } from "next/headers";
import { Cookies } from "./config-types";

export async function setCookies(name: string, value: string) {
  (await cookies()).set({
    name,
    value,
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365 // Cookie values ​​are valid for one year
  });
}

export async function cookiesValues() {
  const cookieStore = await cookies();

  const theme = cookieStore.get(Cookies.theme);
  const isOpenAside = cookieStore.get(Cookies.isOpenAside);

  return {
    theme: theme?.value,
    isOpenAside: isOpenAside?.value
  };
}
