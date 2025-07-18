export const OrgPermission = {
  MANAGE_ORG: 'manage-organization',
} as const;

export type OrgPermission = (typeof OrgPermission)[keyof typeof OrgPermission];
