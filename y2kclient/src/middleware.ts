import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./helpers/services/jwtControl";

const SECRET_KEY = process.env.SECRET_JWT;

if (!SECRET_KEY) {
  throw new Error("SECRET_JWT no está definido. Configúralo en las variables de entorno.");
}

export async function middleware(req: NextRequest) {
  const auth = await isAuthenticated(req);
  const { pathname } = req.nextUrl;

  if (!auth || !auth.success) {
    console.log("Token not valid or doesn't exist. Redirecting.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard") && !auth.admin) {
    console.log("User is not an admin. Redirecting.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/cart"], 
};