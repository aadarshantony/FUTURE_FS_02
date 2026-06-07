import asyncHandler from "../../middleware/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  createLead,
  getLeadById,
  getLeads,
  updateLead,
  deleteLead,
  addNote,
  getLeadStats,
} from "./lead.service.js";

export const createLeadController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const lead =
        await createLead(
          req.body,
          req.user._id
        );

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            lead,
            "Lead created successfully"
          )
        );
    }
  );

export const getLeadsController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const result =
        await getLeads(
          req.query
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            result,
            "Leads fetched successfully"
          )
        );
    }
  );

export const getLeadController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const lead =
        await getLeadById(
          req.params.id
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            lead,
            "Lead fetched successfully"
          )
        );
    }
  );

export const updateLeadController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const lead =
        await updateLead(
          req.params.id,
          req.body,
          req.user._id
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            lead,
            "Lead updated successfully"
          )
        );
    }
  );

export const deleteLeadController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      await deleteLead(
        req.params.id,
        req.user._id
      );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            null,
            "Lead deleted successfully"
          )
        );
    }
  );

export const addNoteController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const lead =
        await addNote(
          req.params.id,
          req.body.content,
          req.user._id
        );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            lead,
            "Note added successfully"
          )
        );
    }
  );

export const getStatsController =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const stats =
        await getLeadStats();

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            stats,
            "Statistics fetched successfully"
          )
        );
    }
  );