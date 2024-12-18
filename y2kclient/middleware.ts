import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY: any = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET no está definido. Configúralo en las variables de entorno.");
}

  export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || "";
    console.log("Token:", token);
  
    if (!token) {
      console.log("No token found. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  
    try {
      jwt.verify(token, SECRET_KEY);
      console.log("Token is valid. Proceeding.");
      return NextResponse.next();
    } catch (error) {
      console.log("Invalid token. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }


export const config = {
  matcher: ["/dashboard", "/account", "/cart"], 
};
