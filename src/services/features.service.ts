import { CreateFeatureDTO } from "@/dto/features/feature.create.dto";
import { UpdateFeatureDTO } from "@/dto/features/feature.update.dto";
import connectDB from "@/lib/db/connectDB";
import { Feature } from "@/models/features/feature.model";
import { validateObjectId } from "@/lib/validators/validateObjectId";

/**
 * Crea una nueva feature en la base de datos.
 *
 * @param data - Datos de la feature a crear
 * @returns Documento de feature creado
 */
export async function createFeature(data: CreateFeatureDTO) {
  await connectDB(); // Asegura conexión a la base de datos
  return Feature.create(data);
}

/**
 * Actualiza una feature existente por su ID.
 *
 * @param id - ID de la feature a actualizar
 * @param data - Datos de actualización
 * @returns Documento actualizado (opción { new: true }) o null si no existe
 */
export async function updateFeature(
  id: string,
  data: UpdateFeatureDTO
) {
  await connectDB();
  validateObjectId(id); // Verifica que el ID sea un ObjectId válido
  return Feature.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * Obtiene una feature por su ID.
 *
 * @param id - ID de la feature
 * @returns Documento de feature o null si no existe
 */
export async function getFeatureById(id: string) {
  await connectDB();
  validateObjectId(id);
  return Feature.findById(id);
}

/**
 * Obtiene un listado de features filtradas y paginadas.
 *
 * @param filter - Filtros para la consulta (ej: { domain: "TECHNICAL" })
 * @param safePage - Número de página (1-indexed)
 * @param safeLimit - Cantidad máxima de resultados por página
 * @returns Arreglo de documentos de features
 */
export async function getFeatures(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return Feature
    .find(filter)
    .skip((safePage - 1) * safeLimit)
    .limit(safeLimit);
}

/**
 * Obtiene el total de features que cumplen con un filtro.
 *
 * @param filter - Filtros opcionales (por defecto todos)
 * @returns Número total de documentos
 */
export async function getTotalFeatures(filter: Record<string, unknown> = {}) {
  await connectDB();
  return Feature.countDocuments(filter);
}

/**
 * Elimina una feature por su ID.
 *
 * @param id - ID de la feature a eliminar
 * @returns Documento eliminado o null si no existe
 */
export async function deleteFeature(id: string) {
  await connectDB();
  validateObjectId(id);
  return Feature.findByIdAndDelete(id);
}
