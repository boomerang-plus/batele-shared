export const JwtType = {
  access: 'access',
  refresh: 'refresh',
  api_key: 'api_key',
} as const;

export type JwtType = (typeof JwtType)[keyof typeof JwtType];
