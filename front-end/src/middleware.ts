import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const isAuthenticated = Boolean(req.cookies.get("access_token"));
  const url = req.nextUrl.clone();
  const LoginPath = `/${routing.defaultLocale}/login`;

  if (!isAuthenticated && url.pathname !== LoginPath) {
    url.pathname = LoginPath;
    return NextResponse.redirect(url);
  }
  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(th|en)/:path*"],
};
