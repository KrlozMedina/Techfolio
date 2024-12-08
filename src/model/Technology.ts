import mongoose, { Schema, Document } from "mongoose";

// Definir constantes para categorías
const CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile Development',
  'Testing',
  'Cloud & Infrastructure',
  'Machine Learning & AI',
  'Data Analysis & Big Data',
  'Cybersecurity',
  'Game Development',
  'AR/VR',
  'IoT (Internet of Things)',
  'Blockchain',
  'Other',
] as const; // Use `as const` para que TypeScript reconozca como un tipo literal

// Definir tipos
export interface ITechnology extends Document {
  name: string;
  category: (typeof CATEGORIES)[number]; // Limita los valores al array de categorías
  logoUrl?: string; // Opcional
}

// Definir esquema
const technologySchema = new Schema<ITechnology>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES, // Usa la constante para las categorías
    },
    logoUrl: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value); // Valida que sea una URL
        },
        message: (props) => `${props.value} no es una URL válida.`,
      },
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false, // Opcionalmente elimina __v
  }
);

// Exportar modelo
const TechnologyModel = mongoose.models.Technology || 
  mongoose.model<ITechnology>("Technology", technologySchema);

export default TechnologyModel;
