export const UserType = {
  MEMBER: 'member',
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];
