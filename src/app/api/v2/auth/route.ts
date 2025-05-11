import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AUTH_CONFIG, deleteToken, setAuthCookie, verifyToken } from "@/lib/utils";
import { createToken, LoginSchema, parseCookies } from "@/lib/helpers";

/**
 * GET handler - verifies token and returns auth status.
 */
export async function GET(request: NextRequest) {
  const verificationResult = verifyToken(request);

  if (verificationResult?.isAuth) {
    return NextResponse.json(verificationResult, { status: 200 });
  }

  const res = NextResponse.json(verificationResult, { status: 401 });
  return deleteToken(res);
}

/**
 * POST handler - logs user in and sets auth token.
 */
export async function POST(request: NextRequest) {
  try {
    const { username, password } = LoginSchema.parse(await request.json());
    const { users, password: validPass } = AUTH_CONFIG.CREDENTIALS;

    const user = (users as { username: string; isDummy: boolean }[]).find(
      u => u.username === username
    );

    const hola = {
      ingreso: {
        user: username,
        pass: password
      },
      env: {
        pass: AUTH_CONFIG.CREDENTIALS.password,
        users: AUTH_CONFIG.CREDENTIALS.users
      },
      userActive: user,
      hash: bcrypt.hashSync(password, 10)
    }
    console.log(hola)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isDummy = user.isDummy;
    const tokenUsername = isDummy ? "dummy" : user.username;

    // If not dummy, validate password with bcrypt
    if (!isDummy && !bcrypt.compareSync(password, validPass)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createToken(tokenUsername, isDummy);
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.headers.set(
      "Set-Cookie",
      setAuthCookie(token, AUTH_CONFIG.TOKEN_EXPIRATION)
    );

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json(
      { error: "Internal server error during login" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler - logs user out and clears auth token.
 */
export async function DELETE(request: NextRequest) {
  try {
    const cookies = parseCookies(request.headers.get("cookie"));
    const token = cookies[AUTH_CONFIG.COOKIE_NAME];

    if (!token) {
      return NextResponse.json({ error: "No active session found" }, { status: 401 });
    }

    jwt.verify(token, AUTH_CONFIG.SECRET);
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

    return deleteToken(response);
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json(
      { error: "Internal server error during logout" },
      { status: 500 }
    );
  }
}
