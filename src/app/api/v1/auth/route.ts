import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Auth configuration
const AUTH_CONFIG = {
  COOKIE_NAME: "authToken", // Name of the cookie used to store the token
  TOKEN_EXPIRATION: 60 * 60, // 1 hour expiration time for the token (in seconds)
  SECRET: process.env.JWT_SECRET || "secret-dev-only", // Secret key to sign the JWT (use env variable in production)
  CREDENTIALS: {
    username: process.env.JWT_USERNAME || "admin", // Default username for authentication
    password: process.env.JWT_PASSWORD || "admin", // Default password for authentication
  },
};

// Zod schema for validating login input
const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"), // Username is required and must be a non-empty string
  password: z.string().min(1, "Password is required"), // Password is required and must be a non-empty string
});

// Utility functions

// Function to parse cookies from the request header
const parseCookies = (cookieHeader: string | null): Record<string, string> =>
  cookieHeader ? Object.fromEntries(cookieHeader.split(";").map(c => c.trim().split("="))) : {};

// Function to create a JWT token for the authenticated user
const createToken = (username: string): string =>
  jwt.sign(
    { sub: username, exp: Math.floor(Date.now() / 1000) + AUTH_CONFIG.TOKEN_EXPIRATION }, // JWT payload includes username and expiration time
    AUTH_CONFIG.SECRET // Secret key used to sign the token
  );

// Function to set the auth token in a cookie
const setAuthCookie = (token: string, maxAge: number): string =>
  serialize(AUTH_CONFIG.COOKIE_NAME, token, {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    secure: process.env.NODE_ENV === "production", // Ensure cookie is only sent over HTTPS in production
    sameSite: "strict", // Prevents the cookie from being sent with cross-site requests
    maxAge, // Maximum age for the cookie (in seconds)
    path: "/", // Path for which the cookie is valid
  });

// GET - Check if the user is authenticated by verifying the JWT token
export async function GET(request: NextRequest) {
  try {
    const cookies = parseCookies(request.headers.get("cookie")); // Parse cookies from the request
    const token = cookies[AUTH_CONFIG.COOKIE_NAME]; // Extract the token from the cookies

    if (!token) {
      return NextResponse.json({ authenticated: false, message: "Token missing" }, { status: 401 }); // Token is missing
    }

    jwt.verify(token, AUTH_CONFIG.SECRET); // Verify the token with the secret key
    return NextResponse.json({ authenticated: true, message: "User is authenticated" }, { status: 200 }); // Token is valid, user is authenticated
  } catch (error) {
    console.error("Auth check failed:", error); // Log the error for debugging
    return NextResponse.json({ authenticated: false, message: "Invalid or expired token" }, { status: 401 }); // Token is invalid or expired
  }
}

// POST - Handle login and set the token in the cookie
export async function POST(request: NextRequest) {
  try {
    const { username, password } = LoginSchema.parse(await request.json()); // Validate the login input using Zod schema
    const { username: validUser, password: validPass } = AUTH_CONFIG.CREDENTIALS; // Get valid credentials from the config

    // Compare the provided credentials with the valid ones
    if (username !== validUser || !bcrypt.compareSync(password, validPass)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 }); // Invalid credentials
    }

    const token = createToken(username); // Create a JWT token for the authenticated user
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.headers.set("Set-Cookie", setAuthCookie(token, AUTH_CONFIG.TOKEN_EXPIRATION)); // Set the JWT token in the response cookie
    return response; // Return the successful login response
  } catch (error) {
    console.error("Login failed:", error); // Log the error for debugging
    return NextResponse.json({ error: "Internal server error during login" }, { status: 500 }); // Internal error during login
  }
}

// DELETE - Handle logout and clear the auth cookie
export async function DELETE(request: NextRequest) {
  try {
    const cookies = parseCookies(request.headers.get("cookie")); // Parse cookies from the request
    const token = cookies[AUTH_CONFIG.COOKIE_NAME]; // Extract the token from the cookies

    if (!token) {
      return NextResponse.json({ error: "No active session found" }, { status: 401 }); // No active session (no token)
    }

    jwt.verify(token, AUTH_CONFIG.SECRET); // Verify the token to ensure the user is logged in
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

    response.headers.set("Set-Cookie", setAuthCookie("", -1)); // Clear the cookie by setting its max age to -1
    return response; // Return the successful logout response
  } catch (error) {
    console.error("Logout failed:", error); // Log the error for debugging
    return NextResponse.json({ error: "Internal server error during logout" }, { status: 500 }); // Internal error during logout
  }
}
