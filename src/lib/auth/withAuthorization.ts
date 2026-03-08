import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { authorize } from "@/lib/auth/authorize";
import { Permission } from "@/lib/auth/permissions";

/**
 * Contexto opcional que puede incluir parámetros de la ruta
 */
type HandlerContext<P = unknown> = {
  params: P;
};

/**
 * Tipo de función handler de API Route o Middleware protegido
 * - req: objeto NextRequest
 * - context: contexto adicional con parámetros opcionales
 * - devuelve un NextResponse
 */
type Handler<P = unknown> = (
  req: NextRequest,
  context: HandlerContext<P>
) => Promise<NextResponse>;

/**
 * Middleware de autorización para API routes de Next.js
 * 
 * Envuelve un handler y verifica:
 * 1. Que exista sesión de usuario (cookie JWT válida)
 * 2. Que el rol del usuario tenga el permiso requerido
 * 
 * @param permission - Permiso requerido para ejecutar la acción
 * @param handler - Función handler original que se ejecutará si la autorización pasa
 * @returns Nuevo handler que realiza la verificación de sesión y permisos
 */
export function withAuthorization<P>(
  permission: Permission,
  handler: Handler<P>
): Handler<P> {
  return async (req, context) => {
    try {
      // Obtiene la sesión del usuario a partir de la cookie
      const session = await getSession(req);

      // Si no hay sesión o no tiene rol definido, devuelve 401
      if (!session?.role) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      // Verifica si el rol tiene el permiso requerido
      const isAuthorized = authorize(session.role, permission);

      // Si no tiene permiso, devuelve 403
      if (!isAuthorized) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      // Usuario autorizado, ejecuta el handler original
      return handler(req, context);
    } catch (error) {
      // Cualquier error en el proceso de autorización devuelve 401
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  };
}
