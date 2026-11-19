export const INVITATION_EXPIRY_VALUES = ["24h", "7d", "30d"] as const;

export type InvitationExpiryValue = (typeof INVITATION_EXPIRY_VALUES)[number];

export const DEFAULT_INVITATION_EXPIRY: InvitationExpiryValue = "7d";

const INVITATION_EXPIRY_HOURS: Record<InvitationExpiryValue, number> = {
  "24h": 24,
  "7d": 7 * 24,
  "30d": 30 * 24,
};

export const INVITATION_EXPIRY_OPTIONS = INVITATION_EXPIRY_VALUES.map(
  (value) => ({
    value,
    labelKey: `createProject.invitationExpiry.options.${value}`,
  }),
);

/** Interval (in hours) sent to the backend; Supabase computes the actual expiry time. */
export const getInvitationExpiryHours = (value: InvitationExpiryValue): number =>
  INVITATION_EXPIRY_HOURS[value];
