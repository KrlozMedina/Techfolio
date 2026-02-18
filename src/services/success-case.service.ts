import { CreateSuccessCaseDTO } from "@/dto/success-case/success-case.create.dto";
import { UpdateSuccessCaseDTO } from "@/dto/success-case/success-case.update.dto";
import connectDB from "@/lib/db/connectDB";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { SuccessCase } from "@/models/success-case/success-case.model";

/**
 * Obtiene una lista paginada de casos de éxito.
 *
 * @param filter - Filtro dinámico para la consulta (ej: { visibility: "PUBLIC" })
 * @param safePage - Número de página validado (>= 1)
 * @param safeLimit - Límite de resultados por página validado
 *
 * Incluye populate de projectIds retornando únicamente el campo `slug`.
 */
export async function getSuccessCases(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number,
) {
  await connectDB();

  return SuccessCase
    .find(filter)
    .skip((safePage - 1) * safeLimit)
    .limit(safeLimit)
    .populate("projectIds", "slug");
}

/**
 * Retorna el total de documentos que coinciden con un filtro.
 * Útil para paginación.
 */
export async function getTotalSuccessCases(
  filter: Record<string, unknown>
) {
  await connectDB();
  return SuccessCase.countDocuments(filter);
}

/**
 * Obtiene un caso de éxito por su ObjectId.
 *
 * Valida previamente que el id tenga formato válido.
 * Incluye populate de projectIds (solo slug).
 */
export async function getSuccessCaseById(id: string) {
  await connectDB();
  validateObjectId(id);

  return SuccessCase
    .findById(id)
    .populate("projectIds", "slug");
}

/**
 * Obtiene un caso de éxito por su slug.
 *
 * Incluye populate de projectIds (solo slug).
 */
export async function getSuccessCaseBySlug(slug: string) {
  await connectDB();

  return SuccessCase
    .findOne({ slug })
    .populate("projectIds", "slug");
}

/**
 * Crea un nuevo caso de éxito.
 *
 * @param data - Datos validados mediante CreateSuccessCaseDTO
 */
export async function createSuccessCase(data: CreateSuccessCaseDTO) {
  await connectDB();
  return SuccessCase.create(data);
}

/**
 * Actualiza un caso de éxito por id.
 *
 * - Valida el ObjectId.
 * - Retorna el documento actualizado.
 * - Ejecuta validaciones del schema (runValidators: true).
 */
export async function updateSuccessCase(
  id: string,
  data: UpdateSuccessCaseDTO
) {
  await connectDB();
  validateObjectId(id);

  return SuccessCase.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

/**
 * Elimina un caso de éxito por id.
 *
 * Valida previamente el ObjectId.
 */
export async function deleteSuccessCase(id: string) {
  await connectDB();
  validateObjectId(id);

  return SuccessCase.findByIdAndDelete(id);
}
