import { NextResponse } from "next/server";
import { AppError } from "@/errors/base/app.error";
import z from "zod";

/**
 * Maneja errores de la capa API y los transforma
 * en respuestas HTTP normalizadas.
 *
 * Casos soportados:
 * - ZodError: errores de validación de request (400)
 * - AppError: errores de dominio/aplicación con status controlado
 * - Otros errores: error interno genérico (500)
 *
 * @param error Error capturado en un handler de API
 * @returns NextResponse con payload y status HTTP apropiado
 */
export function handleApiError(error: unknown) {
  // Error de validación de datos de entrada (Zod)
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }

  // Error de dominio o aplicación controlado
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // Error no controlado
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
