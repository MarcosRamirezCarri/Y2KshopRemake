import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as jose from 'jose'

const SECRET_KEY: any = process.env.SECRET_JWT;





if (!SECRET_KEY) {
  throw new Error("JWT_SECRET no está definido. Configúralo en las variables de entorno.");
}

  export async function middleware(req: NextRequest) {
const tokenCod = req.cookies.get("token")?.value.trim();
    console.log("Clean Token:", tokenCod);
  
    if (!tokenCod) {
      console.log("No token found. Redirecting.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  
    try {
      const decoded =  await jose.jwtVerify(tokenCod, SECRET_KEY)
      if(decoded.payload?.id){
        console.log("Token is valid. Proceeding.");
        return NextResponse.next();
      }
    } catch (error: any) {
      console.log(error.message)
      console.log("Invalid token. Redirecting.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }


export const config = {
  matcher: ["/dashboard", "/cart"], 
};
