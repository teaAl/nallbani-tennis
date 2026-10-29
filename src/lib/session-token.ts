// Signed session token. Kept free of next/headers so the proxy can import it.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "nt_session";
export const SESSION_DAYS = 30;

export type StaffRole = "ADMIN" | "COACH";

export type SessionPayload = {
  /** user id */
  sub: string;
  role: StaffRole;
  name: string;
};

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error("AUTH_SECRET is missing or too short");
  }
  return new TextEncoder().encode(value);
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT({ role: payload.role, name: payload.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    const role = payload.role;
    if (typeof payload.sub !== "string" || (role !== "ADMIN" && role !== "COACH")) return null;
    return { sub: payload.sub, role, name: typeof payload.name === "string" ? payload.name : "" };
  } catch {
    return null;
  }
}
