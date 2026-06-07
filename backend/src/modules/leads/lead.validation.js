import { z } from "zod";

import {
  LEAD_STATUS_VALUES,
  LEAD_SOURCES,
} from "../../utils/constants.js";

export const createLeadSchema =
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
        .enum(
          LEAD_SOURCES
        )
        .optional(),

      dealValue: z
        .number()
        .nonnegative()
        .optional(),
    }),
  });

export const updateLeadSchema =
  z.object({
    body: z.object({
      fullName: z
        .string()
        .min(2)
        .max(150)
        .optional(),

      email: z
        .email()
        .optional(),

      phone: z
        .string()
        .optional(),

      company: z
        .string()
        .optional(),

      source: z
        .enum(
          LEAD_SOURCES
        )
        .optional(),

      status: z
        .enum(
          LEAD_STATUS_VALUES
        )
        .optional(),

      dealValue: z
        .number()
        .nonnegative()
        .optional(),

      assignedTo: z
        .string()
        .optional(),
    }),
  });

export const addNoteSchema =
  z.object({
    body: z.object({
      content: z
        .string()
        .min(1)
        .max(2000),
    }),
  });

export const leadQuerySchema =
  z.object({
    query: z.object({
      page: z
        .string()
        .optional(),

      limit: z
        .string()
        .optional(),

      search: z
        .string()
        .optional(),

      status: z
        .enum(
          LEAD_STATUS_VALUES
        )
        .optional(),

      source: z
        .enum(
          LEAD_SOURCES
        )
        .optional(),

      sortBy: z
        .string()
        .optional(),

      sortOrder: z
        .enum([
          "asc",
          "desc",
        ])
        .optional(),
    }),
  });