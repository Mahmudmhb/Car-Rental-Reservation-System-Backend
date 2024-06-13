import { z } from "zod";

const timeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  { message: '"invalid time formet expected HH.MM in 24 hour format" !' }
);
const newBookedValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    user: z.string().optional(),
    carId: z.string(),
    startTime: timeSchema,
    endTime: timeSchema.optional(),
    totalCost: z.number().optional(),
    isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
  }),
  // .refine(
  //   (body) => {
  //     const start = new Date(`1970-01-01T${body.startTime}`);
  //     const end = new Date(`1970-01-01T${body.endTime}`);
  //     return end > start;
  //   },
  //   {
  //     message: "start time should be before End Time",
  //   }
  // ),
});
export const bookedValidation = {
  newBookedValidationSchema,
};
