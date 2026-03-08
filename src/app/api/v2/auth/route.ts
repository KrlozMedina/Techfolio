import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema, loginUser } from '@/lib/helpers/auth';
import { deleteAuthToken, setAuthToken } from '@/lib/auth/cookies';
import { getSession } from '@/lib/auth/session';

/**
 * GET /api/auth
 * --------------------------------------------------
 * Verifica si existe una sesión activa basada en el
 * token almacenado en cookies.
 *
 * Flujo:
 * - Obtiene la sesión desde el helper `getSession`
 * - Si no hay sesión:
 *   - Elimina la cookie de autenticación
 *   - Retorna 401 con isAuth = false
 * - Si hay sesión:
 *   - Retorna estado autenticado
 *   - Incluye username y role
 */
export async function GET() {
  const session = await getSession();

  if (!session) {
    const res = NextResponse.json(
      { isAuth: false },
      { status: 401 }
    );
    await deleteAuthToken();
    return res;
  }

  return NextResponse.json({
    isAuth: true,
    username: session.username,
    role: session.role, // Rol obligatorio para control de acceso
  });
}

/**
 * POST /api/auth
 * --------------------------------------------------
 * Autentica al usuario y genera una sesión.
 *
 * Flujo:
 * - Valida el body usando LoginSchema (Zod)
 * - Ejecuta loginUser:
 *   - Valida credenciales
 *   - Obtiene el rol desde backend
 *   - Genera y firma un JWT
 * - Si las credenciales son inválidas:
 *   - Retorna 401
 * - Si es exitoso:
 *   - Guarda el token en cookies
 *   - Retorna confirmación
 */
export async function POST(req: NextRequest) {
  try {
    const credentials = LoginSchema.parse(await req.json());

    const token = loginUser(
      credentials.username,
      credentials.password
    );

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: 'Login successful',
    });

    await setAuthToken(token);

    return response;
  } catch {
    // Error de validación o body inválido
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/auth
 * --------------------------------------------------
 * Cierra la sesión del usuario.
 *
 * Flujo:
 * - Verifica si existe una sesión activa
 * - Si no existe:
 *   - Retorna 401
 * - Si existe:
 *   - Elimina el token de autenticación
 *   - Retorna confirmación de logout
 *
 * Nota:
 * - Si el JWT maneja jti, aquí debería revocarse
 *   explícitamente en backend (blacklist).
 */
export async function DELETE() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: 'No active session' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    message: 'Logout successful',
  });

  await deleteAuthToken();

  return response;
}
