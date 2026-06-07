import { z } from "zod";

export const registerSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .min(2)
        .max(100),

      email: z
        .email()
        .toLowerCase(),

      password: z
        .string()
        .min(6)
        .max(50),
    }),
  });

export const loginSchema =
  z.object({
    body: z.object({
      email: z
        .email()
        .toLowerCase(),

      password: z
        .string()
        .min(6),
    }),
  });