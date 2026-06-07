import Activity from "./activity.model.js";

export const createActivity =
  async ({
    leadId,
    userId,
    action,
    description,
    metadata = {},
  }) => {
    return Activity.create({
      lead: leadId,
      user: userId,
      action,
      description,
      metadata,
    });
  };

export const getLeadActivities =
  async (
    leadId,
    limit = 20
  ) => {
    return Activity.find({
      lead: leadId,
    })
      .populate(
        "user",
        "name email"
      )
      .sort({
        createdAt: -1,
      })
      .limit(limit);
  };

export const getRecentActivities =
  async (
    limit = 10
  ) => {
    return Activity.find()
      .populate(
        "user",
        "name email"
      )
      .populate(
        "lead",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      })
      .limit(limit);
  };