import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

/**
 * Configuración del sistema de autenticación.
 */
export const AUTH_CONFIG = {
  COOKIE_NAME: "authToken", // Nombre de la cookie donde se guarda el token
  TOKEN_EXPIRATION: 60 * 60, // Duración del token: 1 hora (en segundos)
  SECRET: process.env.JWT_SECRET || "secret-dev-only", // Clave secreta para firmar/verificar el JWT
  CREDENTIALS: {
    password: process.env.JWT_PASSWORD || "admin",
    users: JSON.parse(process.env.STATIC_USERS || "[]"),
  },
};

/**
 * Serializa y configura una cookie de autenticación segura con el token JWT.
 *
 * @param token - El JWT a establecer en la cookie.
 * @param maxAge - Tiempo de vida del token (en segundos).
 * @returns Cabecera 'Set-Cookie' serializada.
 */
export const setAuthCookie = (token: string, maxAge: number): string =>
  serialize(AUTH_CONFIG.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  });

/**
 * Verifica la validez del token de autenticación presente en las cookies.
 *
 * @param req - Objeto de solicitud NextRequest.
 * @returns Resultado de la verificación con información sobre autenticación.
 */
export const verifyToken = (req: NextRequest) => {
  try {
    const cookieHeader = req.headers.get("cookie");

    const cookies = cookieHeader
      ? Object.fromEntries(
          cookieHeader.split(";").map((c) => c.trim().split("="))
        )
      : {};

    const token = cookies[AUTH_CONFIG.COOKIE_NAME];

    if (!token) {
      return { message: "Token ausente", isAuth: false };
    }

    jwt.verify(token, AUTH_CONFIG.SECRET);

    return {
      message: "Usuario autenticado",
      isAuth: true,
      token: jwt.decode(token),
    };
  } catch (err) {
    console.error("Fallo de autenticación:", err);
    return { message: "Token inválido o expirado", isAuth: false };
  }
};

/**
 * Elimina el token de autenticación de la cookie del usuario.
 *
 * @param res - Objeto de respuesta NextResponse al que se le eliminará la cookie.
 * @returns La respuesta modificada.
 */
export const deleteToken = (res: NextResponse): NextResponse => {
  res.headers.set("Set-Cookie", setAuthCookie("", -1));
  return res;
};

/**
 * Verifica la validez del token y lo elimina si es inválido.
 *
 * @param req - Objeto de solicitud NextRequest.
 * @param res - Objeto de respuesta NextResponse.
 * @returns Respuesta con el token verificado o respuesta sin token si fue eliminado.
 */
export const verifyOrClearToken = (
  req: NextRequest,
  res: NextResponse
): NextResponse => {
  const verificationResult = verifyToken(req);

  return verificationResult.isAuth ? res : deleteToken(res);
};
