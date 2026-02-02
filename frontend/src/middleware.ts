import { NextRequest, NextResponse } from "next/server";
import { Pages, Routes, UserRole } from "./constants/enums";
import { getUser } from "./lib/db/user";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("access_token")?.value;
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  const authPages = [`/${Pages.LOGIN}`, `/${Pages.REGISTER}`];
  const isAuthPage = authPages.some((authPage) =>
    pathname.startsWith(authPage)
  );
  const isAdminPage = pathname.startsWith(`/${Routes.DASHBOARD}`);

  const res = await getUser(token);
  const isAuthenticated = res.status === 200;
  const user = res?.user;
  const currentUserRole = user?.role;

  if (!isAuthenticated && !isAuthPage) {
    url.pathname = `/${Pages.LOGIN}`;
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAuthPage) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAdminPage && currentUserRole === UserRole.USER) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && !isAdminPage && currentUserRole === UserRole.ADMIN) {
    url.pathname = `/${Routes.DASHBOARD}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  if (isAuthenticated && user) {
    response.headers.set("x-user-id", String(user.id));
    response.headers.set("x-user-firstname", String(user.firstname));
    response.headers.set("x-user-lastname", String(user.lastname));
    response.headers.set("x-user-profile_image", String(user.profile_image));
    response.headers.set("x-user-email", String(user.email));
    response.headers.set("x-user-role", String(user.role));
    response.headers.set("x-user-university_id", String(user.university_id));
    response.headers.set("x-user-status", String(user.status));
  }

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
