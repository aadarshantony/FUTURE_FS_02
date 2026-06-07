import express from "express";

import {
  dashboardAnalytics,
  revenueAnalytics,
} from "./analytics.controller.js";

import {
  protect,
} from "../../middleware/auth.middleware.js";

const router =
  express.Router();

router.use(
  protect
);

router.get(
  "/dashboard",
  dashboardAnalytics
);

router.get(
  "/revenue",
  revenueAnalytics
);

export default router;