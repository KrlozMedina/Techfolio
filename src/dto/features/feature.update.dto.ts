import { CreateFeatureDTO, createFeatureSchema } from "./feature.create.dto";

export const updateFeatureSchema = createFeatureSchema.partial();

export type UpdateFeatureDTO = {
  [K in keyof CreateFeatureDTO]?: Partial<CreateFeatureDTO[K]>;
};
