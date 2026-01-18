import { CreateTechnologyDTO } from "@/dto/technology/technology.create.dto";
import { UpdateTechnologyDTO } from "@/dto/technology/technology.update.dto";
import connectDB from "@/lib/db/connectDB";
import { Technology } from "@/models/technology/technology.model";

/**
 * Servicios para operaciones CRUD sobre la entidad Technology.
 * Cada función asegura la conexión a la base de datos antes de operar.
 */

/**
 * Crea una nueva tecnología.
 * - Abre la conexión a la base de datos si no existe
 * - Dispara validaciones y hooks definidos en el schema
 * @param data - DTO con los datos de la tecnología a crear
 * @returns Documento de la tecnología creada
 */
export async function createTechnology(data: CreateTechnologyDTO) {
  await connectDB();
  return Technology.create(data);
}

/**
 * Actualiza una tecnología por ID.
 * - Permite actualizar campos de forma parcial
 * - Ejecuta validaciones del schema y hooks correspondientes
 * - Retorna el documento actualizado
 * @param id - ID de la tecnología a actualizar
 * @param data - DTO con los campos a modificar
 * @returns Documento actualizado o null si no existe
 */
export async function updateTechnology(
  id: string,
  data: UpdateTechnologyDTO
) {
  await connectDB();
  return Technology.findByIdAndUpdate(
    id,
    data,
    {
      new: true,        // Retorna el documento actualizado
      runValidators: true, // Aplica validaciones del schema
    }
  );
}

/**
 * Obtiene una tecnología por su ID.
 * - Incluye la información del slug de la categoría asociada
 * @param id - ID de la tecnología
 * @returns Documento de la tecnología o null si no existe
 */
export async function getTechnologyById(id: string) {
  await connectDB();
  return Technology
    .findById(id)
    .populate("categoryId", "slug"); // Solo trae el slug de la categoría
}

/**
 * Obtiene todas las tecnologías.
 * - Retorna un array de documentos
 * @returns Array de tecnologías
 */
export async function getTechnologies() {
  await connectDB();
  return Technology.find();
}

/**
 * Elimina una tecnología por su ID.
 * @param id - ID de la tecnología a eliminar
 * @returns Documento eliminado o null si no existía
 */
export async function deleteTechnology(id: string) {
  await connectDB();
  return Technology.findByIdAndDelete(id);
}
