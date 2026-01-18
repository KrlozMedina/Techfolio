import { CreateFeatureDTO } from "@/dto/features/feature.create.dto";
import { UpdateFeatureDTO } from "@/dto/features/feature.update.dto";
import connectDB from "@/lib/db/connectDB";
import { Feature } from "@/models/features/feature.model";

/**
 * Crea una nueva feature.
 * - Abre conexión a la base de datos
 * - Ejecuta validaciones y hooks del schema
 */
export async function createFeature(data: CreateFeatureDTO) {
  await connectDB();
  return Feature.create(data);
}

/**
 * Actualiza una feature existente por ID.
 * - Permite actualización parcial
 * - Retorna el documento actualizado
 * - Ejecuta validaciones del schema
 */
export async function updateFeature(
  id: string,
  data: UpdateFeatureDTO
) {
  await connectDB();
  return Feature.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * Obtiene una feature por su ID.
 */
export async function getFeatureById(id: string) {
  await connectDB();
  return Feature.findById(id);
}

/**
 * Obtiene todas las features.
 */
export async function getFeatures() {
  await connectDB();
  return Feature.find();
}

/**
 * Elimina una feature por su ID.
 */
export async function deleteFeature(id: string) {
  await connectDB();
  return Feature.findByIdAndDelete(id);
}
