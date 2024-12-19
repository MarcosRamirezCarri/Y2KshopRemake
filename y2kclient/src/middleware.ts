import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./helpers/services/jwtControl";


const SECRET_KEY: any = process.env.SECRET_JWT;

if (!SECRET_KEY) {
  throw new Error(
    "JWT_SECRET no está definido. Configúralo en las variables de entorno."
  );
}

export async function middleware(req: NextRequest) {
  const auth = await isAuthenticated(req);

  if (!auth) {
    console.log("Token not valid or doesnt exists. Redirecting");
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/cart"],
};
