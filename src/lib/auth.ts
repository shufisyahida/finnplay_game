import { Session } from "@/interfaces/session";
import Iron from "@hapi/iron";
import { MAX_AGE, getTokenCookie, setTokenCookie } from "./auth-cookies";

const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export async function setLoginSession(session: Session) {
  const createdAt = Date.now();
  const token = await Iron.seal(
    { ...session, createdAt, maxAge: MAX_AGE },
    SECRET_TOKEN,
    Iron.defaults
  );

  setTokenCookie(token);
}

export async function getLoginSession(): Promise<Session | undefined> {
  const token = await getTokenCookie();

  if (!token) return;

  const session = await Iron.unseal(token, SECRET_TOKEN, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now > expiresAt) {
    throw new Error("Session expired");
  }

  return session;
}
