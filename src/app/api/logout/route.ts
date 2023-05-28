import { removeTokenCookie } from "@/lib/auth-cookies";
import { RequestContext } from "next/dist/server/base-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, ctx: RequestContext) {
  removeTokenCookie();
  const res = NextResponse.json({}, { status: 200 });
  return res;
}
