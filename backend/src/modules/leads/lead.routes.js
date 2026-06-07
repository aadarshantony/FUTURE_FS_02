import express from "express";

import {
  createLeadController,
  getLeadsController,
  getLeadController,
  updateLeadController,
  deleteLeadController,
  addNoteController,
  getStatsController,
} from "./lead.controller.js";

import validate from "../../middleware/validate.middleware.js";

import {
  protect,
} from "../../middleware/auth.middleware.js";

import {
  createLeadSchema,
  updateLeadSchema,
  addNoteSchema,
} from "./lead.validation.js";

const router =
  express.Router();

router.use(
  protect
);

router.get(
  "/stats",
  getStatsController
);

router.get(
  "/",
  getLeadsController
);

router.get(
  "/:id",
  getLeadController
);

router.post(
  "/",
  validate(
    createLeadSchema
  ),
  createLeadController
);

router.patch(
  "/:id",
  validate(
    updateLeadSchema
  ),
  updateLeadController
);

router.delete(
  "/:id",
  deleteLeadController
);

router.post(
  "/:id/notes",
  validate(
    addNoteSchema
  ),
  addNoteController
);

export default router;