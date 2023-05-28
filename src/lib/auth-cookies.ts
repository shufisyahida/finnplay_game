import { cookies } from "next/headers";
const TOKEN_NAME = "token";

export const MAX_AGE = 60 * 60 * 24; // 24 hours;

export async function setTokenCookie(token: string) {
  "use server";
  // @ts-expect-error
  cookies().set(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function removeTokenCookie() {
  "use server";
  // @ts-expect-error
  cookies().set(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });
}

export function getTokenCookie(): string | undefined {
  return cookies().get(TOKEN_NAME)?.value;
}
