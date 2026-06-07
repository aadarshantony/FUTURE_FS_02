export const LEAD_STATUS = {
  NEW: "new",

  CONTACTED: "contacted",

  QUALIFIED: "qualified",

  PROPOSAL_SENT: "proposal_sent",

  NEGOTIATION: "negotiation",

  CONVERTED: "converted",

  LOST: "lost",
};

export const LEAD_STATUS_VALUES =
  Object.values(
    LEAD_STATUS
  );

export const LEAD_SOURCES = [
  "website",

  "referral",

  "partner",

  "advertisement",

  "cold_outreach",

  "social_media",

  "event",

  "other",
];

export const USER_ROLES = {
  ADMIN: "admin",

  USER: "user",
};

export const USER_ROLE_VALUES =
  Object.values(
    USER_ROLES
  );

export const ACTIVITY_ACTIONS =
  {
    LEAD_CREATED:
      "lead_created",

    LEAD_UPDATED:
      "lead_updated",

    LEAD_DELETED:
      "lead_deleted",

    STATUS_CHANGED:
      "status_changed",

    NOTE_ADDED:
      "note_added",

    ASSIGNED:
      "assigned",
  };