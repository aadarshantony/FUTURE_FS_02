import express from "express";

import {
  getUsers,
  getUser,
  updateRole,
  removeUser,
} from "./user.controller.js";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware.js";

const router =
  express.Router();

router.use(
  protect,
  authorize("admin")
);

router.get(
  "/",
  getUsers
);

router.get(
  "/:id",
  getUser
);

router.patch(
  "/:id/role",
  updateRole
);

router.delete(
  "/:id",
  removeUser
);

export default router;