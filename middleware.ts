import { sessionOptions, type SessionData } from "@core/session";
import { getIronSession } from "iron-session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    if (session.isLoggedIn)
      return NextResponse.redirect(new URL("/dashboard", request.url));
    else return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && session.isLoggedIn)
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (!session.isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto aqueles que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (arquivo de ícone)
     * - logo.svg (arquivo de logo)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)",

    // Rotas Protegidas
    "/dashboard/:path*",
    "/registers/:path*",
  ],
};
