import { NextRequest } from "next/server";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.SECRET_JWT),
};

export const isAuthenticated = async (req: NextRequest) => {
  let token: any = req.cookies.get("token")?.value.trim();

  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, jwtConfig.secret);

      if (decoded.payload?.userId) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
