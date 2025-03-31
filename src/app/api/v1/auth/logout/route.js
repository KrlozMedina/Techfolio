import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

// Constantes de configuración
const AUTH_CONFIG = {
  COOKIE_NAME: 'authToken',
  JWT_SECRET: process.env.JWT_SECRET || 'secret-dev-only'
};

/**
 * Maneja solicitudes POST para cerrar sesión
 * @param {Request} request - Objeto de solicitud HTTP
 * @returns {NextResponse} Respuesta con resultado del logout
 */
export async function POST(request) {
  try {
    // Obtener token de las cookies
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookieHeader ? Object.fromEntries(
      cookieHeader.split(';').map(c => c.trim().split('='))
    ) : {};
    
    const token = cookies[AUTH_CONFIG.COOKIE_NAME];

    // Verificar si existe el token
    if (!token) {
      return NextResponse.json(
        { error: 'No hay token de autenticación' },
        { status: 401 }
      );
    }

    // Verificar validez del token
    verify(token, AUTH_CONFIG.JWT_SECRET);

    // Configurar cookie de eliminación
    const serializedToken = serialize(AUTH_CONFIG.COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: -1, // Expirar inmediatamente
      path: '/'
    });

    // Crear respuesta y establecer cookie
    const response = NextResponse.json(
      { message: 'Logout exitoso' },
      { status: 200 }
    );
    
    response.headers.set('Set-Cookie', serializedToken);
    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Error durante el logout' },
      { status: 500 }
    );
  }
}