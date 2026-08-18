import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RESTRICTED_COOKIE, expectedToken } from "@/app/lib/restricted";

export async function POST(request: Request) {
  const { password } = await request.json();
  const token = expectedToken();

  if (!token || password !== process.env.RESTRICTED_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(RESTRICTED_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
