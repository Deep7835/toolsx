import { NextResponse, type NextRequest } from "next/server";

const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)(:\d+)?$/;

/** Force HTTPS in production for real hosts (hosting usually does this too; this covers custom setups). */
export function proxy(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("host") ?? "";
  const isProd = process.env.NODE_ENV === "production" && !LOCAL.test(host);
  // www → apex (canonical host)
  if (isProd && host.startsWith("www.")) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = host.slice(4);
    return NextResponse.redirect(url, 308);
  }
  if (isProd && proto === "http" && process.env.FORCE_HTTPS !== "false") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = host;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|sw.js|icon.svg).*)"] };
