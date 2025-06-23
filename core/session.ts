import { env } from "@server/infrastructure/configs/env";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
}

export const sessionOptions = {
  password: env.SECRET_COOKIE_PASSWORD,
  cookieName: "auth-session",
  cookieOptions: {
    // Em produção, o cookie só será enviado em HTTPS
    secure: env.NODE_ENV === "production",
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );
  return session;
}
