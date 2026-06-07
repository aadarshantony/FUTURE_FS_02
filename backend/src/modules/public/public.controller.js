import asyncHandler from "../../middleware/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  collectLead,
} from "./public.service.js";

export const collectLeadController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const lead =
        await collectLead(
          {
            ...req.body,

            isPublicLead: true,
          }
        );

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            {
              leadId:
                lead._id,
            },
            "Lead submitted successfully"
          )
        );
    }
  );