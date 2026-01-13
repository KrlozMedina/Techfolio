import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { authorize } from "@/lib/auth/authorize";
import { Permission } from "@/lib/auth/permissions";

/**
 * HandlerContext
 * --------------------------------------------------
 * Contexto opcional que puede pasar parámetros
 * a los handlers de rutas.
 */
type HandlerContext<P = unknown> = {
  params: P;
};

/**
 * Handler
 * --------------------------------------------------
 * Tipo genérico para handlers de rutas que reciben
 * NextRequest y un contexto opcional, y retornan
 * una promesa de NextResponse.
 */
type Handler<P = unknown> = (
  req: NextRequest,
  context: HandlerContext<P>
) => Promise<NextResponse>;

/**
 * withAuthorization
 * --------------------------------------------------
 * Middleware de autorización para endpoints.
 *
 * Flujo:
 * 1. Obtiene la sesión del usuario mediante getSession().
 * 2. Si no hay sesión → retorna 401 Unauthorized.
 * 3. Si la sesión existe pero el rol no tiene permiso → retorna 403 Forbidden.
 * 4. Si pasa las validaciones → ejecuta el handler original.
 *
 * @param permission - Permiso requerido para acceder al endpoint
 * @param handler - Función handler que ejecuta la lógica real
 * @returns un handler protegido que aplica autorización
 */
export function withAuthorization<P>(
  permission: Permission,
  handler: Handler<P>
): Handler<P> {
  return async (req, context) => {
    const session = await getSession();

    // No hay sesión activa
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // El rol no tiene el permiso requerido
    if (!authorize(session.role, permission)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }
    
    // Ejecuta el handler original si pasa la autorización
    return handler(req, context);
  };
}
