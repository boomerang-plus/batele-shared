export const DatabaseExceptionCode = {
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN: 'UNKNOWN',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  FOREIGN_KEY_VIOLATION: 'FOREIGN_KEY_VIOLATION',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type DatabaseExceptionCode =
  (typeof DatabaseExceptionCode)[keyof typeof DatabaseExceptionCode];
