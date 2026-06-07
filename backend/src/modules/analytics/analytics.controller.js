import asyncHandler from "../../middleware/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  getDashboardAnalytics,
  getRevenueAnalytics,
} from "./analytics.service.js";

export const dashboardAnalytics =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const analytics =
        await getDashboardAnalytics();

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            analytics,
            "Analytics fetched successfully"
          )
        );
    }
  );

export const revenueAnalytics =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const analytics =
        await getRevenueAnalytics();

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            analytics,
            "Revenue analytics fetched successfully"
          )
        );
    }
  );