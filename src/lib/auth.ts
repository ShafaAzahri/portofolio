export async function getExpectedSessionToken(): Promise<string> {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const secret = process.env.SESSION_SECRET || "default_fallback_session_secret_portfolio_key";
  const raw = `${email}:${password}:${secret}`;
  const enc = new TextEncoder().encode(raw);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifySession(token?: string): Promise<boolean> {
  if (!token) return false;
  const expected = await getExpectedSessionToken();
  return token === expected;
}
