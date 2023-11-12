import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./shared/constants";

export const middleware = (request: NextRequest) => {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;

  const currentUrl = request.nextUrl.pathname;

  const loginUrl = new URL("/login", request.url);
  const feedUrl = new URL("/feed", request.url);

  if (!cookie) {
    if (currentUrl === "/login" || currentUrl === "/register") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(loginUrl);
    }
  } else if (cookie) {
    if (currentUrl === "/login" || currentUrl === "/register") {
      return NextResponse.redirect(feedUrl);
    } else {
      return NextResponse.next();
    }
  }
};
export const config = {
  matcher: ["/login", "/feed"],
};
