import { z } from "zod";

const newBookedValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    user: z.string().optional(),
    carId: z.string(),
    startTime: z.string(),
    endTime: z.string().optional(),
    totalCost: z.number().optional(),
    isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
  }),
});
export const bookedValidation = {
  newBookedValidationSchema,
};
