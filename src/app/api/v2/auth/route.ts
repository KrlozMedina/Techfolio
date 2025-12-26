import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema, parseCookies, loginUser } from '@/lib/helpers/auth';
import { deleteAuthToken, setAuthToken } from '@/lib/auth/cookies';
import { getSession } from '@/lib/auth/session';

/**
 * GET handler - Verifica si el usuario tiene sesión activa.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();

  if (session) {
    return NextResponse.json({
      isAuth: true,
      username: session.username,
      isDummy: session.isDummy,
    });
  }

  const res = NextResponse.json({ isAuth: false, message: 'No active session' }, { status: 401 });
  await deleteAuthToken();
  return res;
}

/**
 * POST handler - Login y creación de token.
 */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = LoginSchema.parse(await req.json());

    const token = loginUser(username, password);

    if (!token) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    await setAuthToken(token);

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ error: 'Internal server error during login' }, { status: 500 });
  }
}

/**
 * DELETE handler - Logout, elimina el token.
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    await deleteAuthToken();
    return response;
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json({ error: 'Internal server error during logout' }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { getSession } from '@/lib/auth/session';
// import { createToken } from '@/lib/auth/token';
// import { setAuthToken, deleteAuthToken } from '@/lib/auth/cookies';
// import { LoginSchema } from '@/lib/helpers';
// import { AUTH_CONFIG } from '@/lib/auth/config';
// import { AuthUser } from '@/lib/auth/types';

// export async function GET() {
//   const session = getSession();

//   if (!session) {
//     deleteAuthToken();
//     return NextResponse.json({ isAuth: false }, { status: 401 });
//   }

//   return NextResponse.json({ isAuth: true, session }, { status: 200 });
// }

// export async function POST(req: Request) {
//   const { username, password } = LoginSchema.parse(await req.json());
//   // const { users, password: passwordHash } = AUTH_CONFIG.CREDENTIALS;
//   const users: AuthUser[] = AUTH_CONFIG.USERS;
//   const passwordHash = AUTH_CONFIG.PASSWORD_HASH;

//   type User = { username: string; isDummy: boolean };
//   // const user = (users as User[]).find((u: User) => u.username === username);

//   // // const user = users.find(u => u.username === username);
//   // if (!user) {
//   //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   // }

//   // if (!user.isDummy && !bcrypt.compareSync(password, passwordHash)) {
//   //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   // }
//   const user = users.find((u) => u.username === username);

//   if (!user) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   }

//   if (!user.isDummy && !bcrypt.compareSync(password, passwordHash)) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   }

//   const token = createToken({ username, isDummy: user.isDummy });
//   setAuthToken(token);

//   return NextResponse.json({ message: 'Login successful' }, { status: 200 });
// }

// export async function DELETE() {
//   const session = getSession();
//   if (!session) {
//     return NextResponse.json({ error: 'No active session' }, { status: 401 });
//   }

//   deleteAuthToken();
//   return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
// }


// // import { NextRequest, NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import bcrypt from "bcryptjs";
// // import { AUTH_CONFIG, deleteToken, setAuthCookie, verifyToken } from "@/lib/utils";
// // import { createToken, LoginSchema, parseCookies } from "@/lib/helpers";

// // /**
// //  * GET handler - verifies token and returns auth status.
// //  */
// // export async function GET(request: NextRequest) {
// //   const verificationResult = verifyToken(request);

// //   if (verificationResult?.isAuth) {
// //     return NextResponse.json(verificationResult, { status: 200 });
// //   }

// //   const res = NextResponse.json(verificationResult, { status: 401 });
// //   return deleteToken(res);
// // }

// // /**
// //  * POST handler - logs user in and sets auth token.
// //  */
// // export async function POST(request: NextRequest) {
// //   try {
// //     const { username, password } = LoginSchema.parse(await request.json());
// //     const { users, password: validPass } = AUTH_CONFIG.CREDENTIALS;

// //     const user = (users as { username: string; isDummy: boolean }[]).find(
// //       u => u.username === username
// //     );

// //     // const hola = {
// //     //   ingreso: {
// //     //     user: username,
// //     //     pass: password
// //     //   },
// //     //   env: {
// //     //     pass: AUTH_CONFIG.CREDENTIALS.password,
// //     //     users: AUTH_CONFIG.CREDENTIALS.users
// //     //   },
// //     //   userActive: user,
// //     //   hash: bcrypt.hashSync(password, 10)
// //     // }
// //     // console.log(hola)

// //     if (!user) {
// //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// //     }

// //     const isDummy = user.isDummy;
// //     const tokenUsername = isDummy ? "dummy" : user.username;

// //     // If not dummy, validate password with bcrypt
// //     if (!isDummy && !bcrypt.compareSync(password, validPass)) {
// //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// //     }

// //     const token = createToken(tokenUsername, isDummy);
// //     const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

// //     response.headers.set(
// //       "Set-Cookie",
// //       setAuthCookie(token, AUTH_CONFIG.TOKEN_EXPIRATION)
// //     );

// //     return response;
// //   } catch (error) {
// //     console.error("Login failed:", error);
// //     return NextResponse.json(
// //       { error: "Internal server error during login" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // /**
// //  * DELETE handler - logs user out and clears auth token.
// //  */
// // export async function DELETE(request: NextRequest) {
// //   try {
// //     const cookies = parseCookies(request.headers.get("cookie"));
// //     const token = cookies[AUTH_CONFIG.COOKIE_NAME];

// //     if (!token) {
// //       return NextResponse.json({ error: "No active session found" }, { status: 401 });
// //     }

// //     jwt.verify(token, AUTH_CONFIG.SECRET);
// //     const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

// //     return deleteToken(response);
// //   } catch (error) {
// //     console.error("Logout failed:", error);
// //     return NextResponse.json(
// //       { error: "Internal server error during logout" },
// //       { status: 500 }
// //     );
// //   }
// // }
