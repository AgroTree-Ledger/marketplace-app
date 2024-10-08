export { auth as middleware } from "@/auth";


export const config = {
  matcher: ['/profile/:path*', "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
