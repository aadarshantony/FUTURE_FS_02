import Lead from "../leads/lead.model.js";

import {
  ACTIVITY_ACTIONS,
} from "../../utils/constants.js";

import {
  createActivity,
} from "../activities/activity.service.js";

export const collectLead =
  async (
    payload
  ) => {
    const lead =
      await Lead.create({
        ...payload,
      });

    await createActivity({
      leadId: lead._id,

      userId:
        lead.createdBy ||
        lead._id,

      action:
        ACTIVITY_ACTIONS.LEAD_CREATED,

      description:
        "Lead collected through public API",
    });

    return lead;
  };