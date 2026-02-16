import connectDB from "@/lib/db/connectDB";
import { Category } from "@/models/category/category.model";
import { CreateCategoryDTO } from "@/dto/category/category.create.dto";
import { UpdateCategoryDTO } from "@/dto/category/category.update.dto";
import { validateObjectId } from "@/lib/validators/validateObjectId";

/**
 * Crea una nueva categoría en la base de datos.
 * @param data - Datos validados para la creación
 * @returns Documento creado
 */
export async function createCategory(data: CreateCategoryDTO) {
  await connectDB();
  return Category.create(data);
}

/**
 * Actualiza una categoría por ID.
 * - Valida el ObjectId antes de consultar.
 * - Devuelve el documento actualizado.
 * - Ejecuta validaciones del schema de Mongoose.
 *
 * @param id - ID de la categoría
 * @param data - Datos parciales para actualizar
 */
export async function updateCategory(
  id: string,
  data: UpdateCategoryDTO
) {
  await connectDB();
  validateObjectId(id);

  return Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

/**
 * Obtiene una categoría por su ID.
 * @param id - ID válido de MongoDB
 */
export async function getCategoryById(id: string) {
  await connectDB();
  validateObjectId(id);
  return Category.findById(id);
}

/**
 * Obtiene categorías con paginación.
 *
 * @param filter - Filtros dinámicos (ej: { active: true })
 * @param safePage - Número de página (>=1)
 * @param safeLimit - Cantidad de registros por página
 */
export async function getCategories(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();

  return Category
    .find(filter)
    .skip((safePage - 1) * safeLimit)
    .limit(safeLimit);
}

/**
 * Devuelve el total de categorías según filtro.
 * Útil para construir metadata de paginación.
 *
 * @param filter - Filtros opcionales
 */
export async function getTotalCategories(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return Category.countDocuments(filter);
}

/**
 * Elimina una categoría por ID.
 * @param id - ID válido de MongoDB
 */
export async function deleteCategory(id: string) {
  await connectDB();
  validateObjectId(id);
  return Category.findByIdAndDelete(id);
}
