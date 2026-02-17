import { CreateTechnologyDTO } from "@/dto/technology/technology.create.dto";
import { UpdateTechnologyDTO } from "@/dto/technology/technology.update.dto";
import connectDB from "@/lib/db/connectDB";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { Technology } from "@/models/technology/technology.model";

/**
 * Crea una nueva tecnología en la base de datos.
 *
 * - Establece conexión con MongoDB.
 * - Inserta el documento usando el modelo Technology.
 *
 * @param data Datos validados para la creación.
 * @returns Documento creado.
 */
export async function createTechnology(data: CreateTechnologyDTO) {
  await connectDB();
  return Technology.create(data);
}

/**
 * Actualiza una tecnología existente por su ID.
 *
 * - Valida que el ID sea un ObjectId válido.
 * - Ejecuta validaciones del modelo.
 * - Retorna el documento actualizado.
 *
 * @param id ID de la tecnología.
 * @param data Campos a actualizar (parcial).
 * @returns Documento actualizado o null.
 */
export async function updateTechnology(
  id: string,
  data: UpdateTechnologyDTO
) {
  await connectDB();
  validateObjectId(id);

  return Technology.findByIdAndUpdate(id, data, {
    new: true,          // retorna el documento actualizado
    runValidators: true // ejecuta validaciones del schema
  });
}

/**
 * Obtiene una tecnología por su ID.
 *
 * - Valida ObjectId.
 * - Hace populate del campo `categoryId`
 *   trayendo únicamente el `slug`.
 *
 * @param id ID de la tecnología.
 * @returns Documento encontrado o null.
 */
export async function getTechnologyById(id: string) {
  await connectDB();
  validateObjectId(id);

  return Technology
    .findById(id)
    .populate("categoryId", "slug");
}

/**
 * Obtiene una lista paginada de tecnologías.
 *
 * @param filter Filtros aplicados a la consulta.
 * @param safePage Número de página validado.
 * @param safeLimit Límite de registros por página.
 * @returns Lista de tecnologías.
 */
export async function getTechnologies(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();

  return Technology
    .find(filter)
    .skip((safePage - 1) * safeLimit)
    .limit(safeLimit);
}

/**
 * Obtiene el total de tecnologías según un filtro.
 *
 * @param filter Filtros aplicados.
 * @returns Número total de documentos.
 */
export async function getTotalTechnologies(
  filter: Record<string, unknown>
) {
  await connectDB();
  return Technology.countDocuments(filter);
}

/**
 * Elimina una tecnología por su ID.
 *
 * - Valida ObjectId.
 *
 * @param id ID de la tecnología.
 * @returns Documento eliminado o null.
 */
export async function deleteTechnology(id: string) {
  await connectDB();
  validateObjectId(id);
  return Technology.findByIdAndDelete(id);
}
