import Lead from "./lead.model.js";

import ApiError from "../../utils/ApiError.js";

import buildPagination from "../../utils/pagination.js";

import {
  ACTIVITY_ACTIONS,
} from "../../utils/constants.js";

import {
  createActivity,
} from "../activities/activity.service.js";

export const createLead =
  async (
    payload,
    userId
  ) => {
    const lead =
      await Lead.create({
        ...payload,
        createdBy: userId,
      });

    await createActivity({
      leadId: lead._id,
      userId,
      action:
        ACTIVITY_ACTIONS.LEAD_CREATED,
      description:
        "Lead created",
    });

    return lead;
  };

export const getLeadById =
  async (
    leadId
  ) => {
    const lead =
      await Lead.findById(
        leadId
      )
        .populate(
          "createdBy",
          "name email"
        )
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "notes.createdBy",
          "name email"
        );

    if (!lead) {
      throw new ApiError(
        404,
        "Lead not found"
      );
    }

    return lead;
  };

export const getLeads =
  async (
    query
  ) => {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      source,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    const {
      pageSize,
      skip,
      currentPage,
    } = buildPagination(
      page,
      limit
    );

    const filters = {};

    if (status) {
      filters.status =
        status;
    }

    if (source) {
      filters.source =
        source;
    }

    if (
      search &&
      search.trim()
    ) {
      filters.$text = {
        $search:
          search.trim(),
      };
    }

    const sort = {
      [sortBy]:
        sortOrder === "asc"
          ? 1
          : -1,
    };

    const [
      leads,
      total,
    ] = await Promise.all([
      Lead.find(filters)
        .populate(
          "assignedTo",
          "name email"
        )
        .sort(sort)
        .skip(skip)
        .limit(pageSize),

      Lead.countDocuments(
        filters
      ),
    ]);

    return {
      leads,

      pagination: {
        total,
        page:
          currentPage,
        limit:
          pageSize,
        pages:
          Math.ceil(
            total /
              pageSize
          ),
      },
    };
  };

export const updateLead =
  async (
    leadId,
    payload,
    userId
  ) => {
    const lead =
      await Lead.findById(
        leadId
      );

    if (!lead) {
      throw new ApiError(
        404,
        "Lead not found"
      );
    }

    const oldStatus =
      lead.status;

    Object.assign(
      lead,
      payload
    );

    await lead.save();

    await createActivity({
      leadId,
      userId,

      action:
        ACTIVITY_ACTIONS.LEAD_UPDATED,

      description:
        "Lead updated",
    });

    if (
      payload.status &&
      payload.status !==
        oldStatus
    ) {
      await createActivity({
        leadId,
        userId,

        action:
          ACTIVITY_ACTIONS.STATUS_CHANGED,

        description: `Status changed from ${oldStatus} to ${payload.status}`,

        metadata: {
          oldStatus,
          newStatus:
            payload.status,
        },
      });
    }

    if (
      payload.assignedTo
    ) {
      await createActivity({
        leadId,
        userId,

        action:
          ACTIVITY_ACTIONS.ASSIGNED,

        description:
          "Lead assigned",
      });
    }

    return lead;
  };

export const deleteLead =
  async (
    leadId,
    userId
  ) => {
    const lead =
      await Lead.findById(
        leadId
      );

    if (!lead) {
      throw new ApiError(
        404,
        "Lead not found"
      );
    }

    await createActivity({
      leadId,
      userId,

      action:
        ACTIVITY_ACTIONS.LEAD_DELETED,

      description:
        "Lead deleted",
    });

    await Lead.findByIdAndDelete(
      leadId
    );

    return true;
  };

export const addNote =
  async (
    leadId,
    content,
    userId
  ) => {
    const lead =
      await Lead.findById(
        leadId
      );

    if (!lead) {
      throw new ApiError(
        404,
        "Lead not found"
      );
    }

    lead.notes.push({
      content,
      createdBy:
        userId,
    });

    await lead.save();

    await createActivity({
      leadId,
      userId,

      action:
        ACTIVITY_ACTIONS.NOTE_ADDED,

      description:
        "Note added",
    });

    return lead;
  };

export const getLeadStats =
  async () => {
    const [
      totalLeads,

      newLeads,

      contactedLeads,

      convertedLeads,

      lostLeads,
    ] =
      await Promise.all([
        Lead.countDocuments(),

        Lead.countDocuments(
          {
            status:
              "new",
          }
        ),

        Lead.countDocuments(
          {
            status:
              "contacted",
          }
        ),

        Lead.countDocuments(
          {
            status:
              "converted",
          }
        ),

        Lead.countDocuments(
          {
            status:
              "lost",
          }
        ),
      ]);

    const conversionRate =
      totalLeads > 0
        ? (
            (convertedLeads /
              totalLeads) *
            100
          ).toFixed(2)
        : 0;

    return {
      totalLeads,

      newLeads,

      contactedLeads,

      convertedLeads,

      lostLeads,

      conversionRate,
    };
  };