import { ITechnology } from "@/types/common";
import { CATEGORIES } from "@/types/constants";
import mongoose, { Schema } from "mongoose";

const technologySchema = new Schema<ITechnology>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES,
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
    timestamps: true,
    versionKey: false,
  }
);

const TechnologyModel = mongoose.models.Technology || 
  mongoose.model<ITechnology>("Technology", technologySchema);

export default TechnologyModel;
