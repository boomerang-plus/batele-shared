import { DatabaseExceptionCode } from '../constants/database-exception-code.enum';
import { BaseException } from './base.exception';

export class DatabaseException extends Error {
  code: DatabaseExceptionCode;
  message: string;

  constructor(code: DatabaseExceptionCode, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }

  static notFound(message: string) {
    return new DatabaseException(DatabaseExceptionCode.NOT_FOUND, message);
  }

  static duplicateEntry(message: string) {
    return new DatabaseException(
      DatabaseExceptionCode.DUPLICATE_ENTRY,
      message,
    );
  }

  static foreignKeyViolation(message: string) {
    return new DatabaseException(
      DatabaseExceptionCode.FOREIGN_KEY_VIOLATION,
      message,
    );
  }

  static validationError(message: string) {
    return new DatabaseException(
      DatabaseExceptionCode.VALIDATION_ERROR,
      message,
    );
  }

  static timeout(message: string) {
    return new DatabaseException(DatabaseExceptionCode.TIMEOUT, message);
  }

  static unauthorized(message: string) {
    return new DatabaseException(DatabaseExceptionCode.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new DatabaseException(DatabaseExceptionCode.FORBIDDEN, message);
  }

  static internalError(message: string) {
    return new DatabaseException(DatabaseExceptionCode.INTERNAL_ERROR, message);
  }

  toBaseException(): BaseException {
    switch (this.code) {
      case DatabaseExceptionCode.NOT_FOUND:
        return BaseException.notFound(this.message);

      case DatabaseExceptionCode.DUPLICATE_ENTRY:
        return BaseException.conflict(this.message);

      case DatabaseExceptionCode.FOREIGN_KEY_VIOLATION:
        return BaseException.badRequest(this.message);

      case DatabaseExceptionCode.VALIDATION_ERROR:
        return BaseException.badRequest(this.message);

      case DatabaseExceptionCode.TIMEOUT:
        return BaseException.requestTimeout(this.message);

      case DatabaseExceptionCode.UNAUTHORIZED:
        return BaseException.unauthorized(this.message);

      case DatabaseExceptionCode.FORBIDDEN:
        return BaseException.forbidden(this.message);

      case DatabaseExceptionCode.INTERNAL_ERROR:
      default:
        return BaseException.internalServerError(this.message);
    }
  }
}
