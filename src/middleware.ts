import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./shared/constants";

export const middleware = (request: NextRequest) => {
  let token = {
    accessToken: null,
  };

  const cookie = request.cookies.get(COOKIE_NAME);

  if (cookie) {
    token = JSON.parse(cookie.value);
  }

  const currentUrl = request.nextUrl.pathname;

  const loginUrl = new URL("/login", request.url);
  const feedUrl = new URL("/feed", request.url);

  if (!token.accessToken) {
    if (currentUrl === "/login" || currentUrl === "/register") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(loginUrl);
    }
  } else if (token.accessToken) {
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
