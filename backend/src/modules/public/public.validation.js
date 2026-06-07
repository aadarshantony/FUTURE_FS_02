import { z } from "zod";

export const collectLeadSchema =
  z.object({
    body: z.object({
      fullName: z
        .string()
        .min(2)
        .max(150),

      email: z.email(),

      phone: z
        .string()
        .optional(),

      company: z
        .string()
        .optional(),

      source: z
        .string()
        .optional(),

      dealValue: z
        .number()
        .nonnegative()
        .optional(),
    }),
  });