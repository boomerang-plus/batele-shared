export const AppEnvironment = {
  PRODUCTION: 'PRODUCTION',
  STAGING: 'STAGING',
  DEV: 'DEV',
  LOCAL: 'LOCAL',
} as const;

export type AppEnvironment =
  (typeof AppEnvironment)[keyof typeof AppEnvironment];
