import express from "express";

import {
  protect,
} from "../../middleware/auth.middleware.js";

import asyncHandler from "../../middleware/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  getLeadActivities,
  getRecentActivities,
} from "./activity.service.js";

const router =
  express.Router();

router.use(
  protect
);

router.get(
  "/recent",
  asyncHandler(
    async (
      req,
      res
    ) => {
      const activities =
        await getRecentActivities(
          20
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            activities,
            "Recent activities fetched"
          )
        );
    }
  )
);

router.get(
  "/lead/:leadId",
  asyncHandler(
    async (
      req,
      res
    ) => {
      const activities =
        await getLeadActivities(
          req.params.leadId
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            activities,
            "Lead activities fetched"
          )
        );
    }
  )
);

export default router;