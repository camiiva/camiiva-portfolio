import { createHash } from "crypto";
import { cookies } from "next/headers";

export const RESTRICTED_COOKIE = "restricted-access";

// The cookie stores a hash of the password, not the password itself, so
// inspecting the (HttpOnly) cookie value in devtools doesn't expose it.
export function expectedToken(): string | null {
  const password = process.env.RESTRICTED_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export async function isUnlocked(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  const cookieStore = await cookies();
  return cookieStore.get(RESTRICTED_COOKIE)?.value === token;
}
