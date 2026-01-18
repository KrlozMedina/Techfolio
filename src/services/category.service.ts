import connectDB from "@/lib/db/connectDB";
import { Category } from "@/models/category/category.model";
import { CreateCategoryDTO } from "@/dto/category/category.create.dto";
import { UpdateCategoryDTO } from "@/dto/category/category.update.dto";

/**
 * Servicio de categorías.
 *
 * Capa responsable de:
 * - Gestionar la conexión a la base de datos
 * - Encapsular el acceso al modelo Category
 * - Mantener la lógica de persistencia desacoplada de la API
 */

/**
 * Crea una nueva categoría.
 *
 * Flujo:
 * 1. Abre (o reutiliza) la conexión a MongoDB
 * 2. Inserta el documento en la colección
 * 3. Ejecuta validaciones y hooks definidos en el schema
 *
 * @param data DTO con el contenido multilenguaje de la categoría
 * @returns Documento creado
 */
export async function createCategory(data: CreateCategoryDTO) {
  await connectDB();
  return Category.create(data);
}

/**
 * Actualiza una categoría existente por su ID.
 *
 * Características:
 * - Soporta actualizaciones parciales (PATCH semantics)
 * - Ejecuta validaciones del schema
 * - Dispara hooks de actualización (ej. regeneración de slug)
 *
 * @param id Identificador de la categoría
 * @param data DTO parcial con los campos a actualizar
 * @returns Documento actualizado o null si no existe
 */
export async function updateCategory(
  id: string,
  data: UpdateCategoryDTO
) {
  await connectDB();
  return Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,          // retorna el documento actualizado
      runValidators: true // aplica validaciones del schema
    }
  );
}

/**
 * Obtiene una categoría por su ID.
 *
 * @param id Identificador de la categoría
 * @returns Documento encontrado o null
 */
export async function getCategoryById(id: string) {
  await connectDB();
  return Category.findById(id);
}

/**
 * Obtiene todas las categorías registradas.
 *
 * @returns Lista completa de categorías
 */
export async function getCategories() {
  await connectDB();
  return Category.find();
}

/**
 * Elimina una categoría por su ID.
 *
 * @param id Identificador de la categoría
 * @returns Documento eliminado o null
 */
export async function deleteCategory(id: string) {
  await connectDB();
  return Category.findByIdAndDelete(id);
}
