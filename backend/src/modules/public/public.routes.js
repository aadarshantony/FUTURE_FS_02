import express from "express";

import validate from "../../middleware/validate.middleware.js";

import {
  collectLeadController,
} from "./public.controller.js";

import {
  collectLeadSchema,
} from "./public.validation.js";

const router =
  express.Router();

router.post(
  "/leads",
  validate(
    collectLeadSchema
  ),
  collectLeadController
);

export default router;