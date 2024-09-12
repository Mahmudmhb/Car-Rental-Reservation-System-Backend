import { string, z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
    color: z.string({ required_error: "Color is required" }).optional(),
    isElectric: z
      .boolean({ required_error: "Electric status is required" })
      .optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z
      .array(z.string({ required_error: "Features are required" }))
      .optional(),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .optional(),
    isDeleted: z
      .boolean({ required_error: "Deletion status is required" })
      .optional(),
    AdditionalFeatures: z
      .array(z.string({ required_error: "Additional Features are required" }))
      .optional(),
    carType: z
      .enum(["SUV", "Sedan", "Hatchback", "Convertible"], {
        required_error: "Car Type is required",
      })
      .optional(),
    image: z.string().optional(),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
    color: z.string({ required_error: "Color is required" }).optional(),
    isElectric: z
      .boolean({ required_error: "Electric status is required" })
      .optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z
      .array(z.string({ required_error: "Features are required" }))
      .optional(),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .optional(),
    isDeleted: z
      .boolean({ required_error: "Deletion status is required" })
      .optional(),
    AdditionalFeatures: z
      .array(z.string({ required_error: "Additional Features are required" }))
      .optional(),
    carType: z
      .enum(["SUV", "Sedan", "Hatchback", "Convertible"], {
        required_error: "Car Type is required",
      })
      .optional(),
    image: z.string().optional(),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
