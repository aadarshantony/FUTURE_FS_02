export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  PROPOSAL_SENT: 'proposal_sent',
  NEGOTIATION: 'negotiation',
  CONVERTED: 'converted',
  LOST: 'lost',
};

export const LEAD_STATUS_VALUES = Object.values(LEAD_STATUS);

export const LEAD_SOURCES = [
  'website',
  'referral',
  'partner',
  'advertisement',
  'cold_outreach',
  'social_media',
  'event',
  'other',
];

export const STATUS_CONFIG = {
  new: {
    label: 'New',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    dot: 'bg-blue-400',
  },
  contacted: {
    label: 'Contacted',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/30',
    dot: 'bg-violet-400',
  },
  qualified: {
    label: 'Qualified',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    dot: 'bg-amber-400',
  },
  proposal_sent: {
    label: 'Proposal Sent',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    border: 'border-pink-400/30',
    dot: 'bg-pink-400',
  },
  negotiation: {
    label: 'Negotiation',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    dot: 'bg-orange-400',
  },
  converted: {
    label: 'Converted',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    dot: 'bg-emerald-400',
  },
  lost: {
    label: 'Lost',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    dot: 'bg-red-400',
  },
};

export const SOURCE_LABELS = {
  website: 'Website',
  referral: 'Referral',
  partner: 'Partner',
  advertisement: 'Advertisement',
  cold_outreach: 'Cold Outreach',
  social_media: 'Social Media',
  event: 'Event',
  other: 'Other',
};

export const ACTIVITY_ACTION_CONFIG = {
  lead_created: { label: 'Lead Created', color: 'text-emerald-400' },
  lead_updated: { label: 'Lead Updated', color: 'text-blue-400' },
  lead_deleted: { label: 'Lead Deleted', color: 'text-red-400' },
  status_changed: { label: 'Status Changed', color: 'text-amber-400' },
  note_added: { label: 'Note Added', color: 'text-violet-400' },
  assigned: { label: 'Lead Assigned', color: 'text-pink-400' },
};
