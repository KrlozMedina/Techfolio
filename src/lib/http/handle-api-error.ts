import { NextResponse } from "next/server";
import { AppError } from "@/errors/base/app.error";
import z from "zod";

/**
 * Maneja errores de manera centralizada en API routes de Next.js.
 * Permite diferenciar entre errores de validación, errores personalizados y errores inesperados.
 *
 * @param error - Objeto de error lanzado en el handler
 * @returns NextResponse con mensaje de error y código HTTP adecuado
 */
export function handleApiError(error: unknown): NextResponse {
  // Manejo de errores de validación de Zod
  if (error instanceof z.ZodError) {
    // Obtiene el primer campo con problema
    const firstIssue = error.issues[0];
    const errorField = firstIssue?.path.join(".") || "unknown_field";

    return NextResponse.json(
      { error: `Invalid request data (${errorField})` },
      { status: 400 } // Bad Request
    );
  }

  // Manejo de errores personalizados de la aplicación
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode } // Usa el código definido en el error
    );
  }

  // Manejo de errores inesperados
  console.error("[API ERROR]:", error);

  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 } // Internal Server Error
  );
}
