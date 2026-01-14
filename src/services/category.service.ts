import connectDB from "@/lib/db/connectDB";
import { Category } from "@/models/category/category.model";
import { CreateCategoryDTO } from "@/dto/category/category.create.dto";
import { UpdateCategoryDTO } from "@/dto/category/category.update.dto";

/**
 * Crea una nueva categoría.
 * - Abre conexión a BD
 * - Dispara validaciones y hooks del schema
 */
export async function createCategory(data: CreateCategoryDTO) {
  await connectDB();
  return Category.create(data);
}

/**
 * Actualiza una categoría por ID.
 * - Permite actualización parcial
 * - Retorna el documento actualizado
 * - Ejecuta validaciones del schema
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
      new: true,
      runValidators: true,
    }
  );
}

/**
 * Obtiene una categoría por ID.
 */
export async function getCategoryById(id: string) {
  await connectDB();
  return Category.findById(id);
}

/**
 * Obtiene todas las categorías.
 */
export async function getCategories() {
  await connectDB();
  return Category.find();
}

/**
 * Elimina una categoría por ID.
 */
export async function deleteCategory(id: string) {
  await connectDB();
  return Category.findByIdAndDelete(id);
}
