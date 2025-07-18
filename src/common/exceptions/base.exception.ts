import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends Error {
  static badRequest(
    message: string = 'Bad request',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message: message,
      codeName: 'BAD_REQUEST',
      httpCode: HttpStatus.BAD_REQUEST,
      // gRPCCode: GrpcStatus.INVALID_ARGUMENT,
      metadata: metadata,
    });
  }
  static internalServerError(
    message: string = 'Internal Server Error',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message: message,
      codeName: 'INTERNAL_SERVER_ERROR',
      httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
      // gRPCCode: GrpcStatus.INTERNAL,
      metadata: metadata,
    });
  }
  static notFound(
    message: string = 'Not Found',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message: message,
      codeName: 'NOT_FOUND',
      httpCode: HttpStatus.NOT_FOUND,
      // gRPCCode: GrpcStatus.NOT_FOUND,
      metadata: metadata,
    });
  }
  static tooManyRequests(
    message: string = 'Too Many Request',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message: message,
      codeName: 'TOO_MANY_REQUESTS',
      httpCode: HttpStatus.TOO_MANY_REQUESTS,
      // gRPCCode: GrpcStatus.RESOURCE_EXHAUSTED,
      metadata: metadata,
    });
  }
  static unauthorized(
    message: string = 'Unauthorized',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message: message,
      codeName: 'UNAUTHORIZED',
      httpCode: HttpStatus.UNAUTHORIZED,
      // gRPCCode: GrpcStatus.UNAUTHENTICATED,
      metadata: metadata,
    });
  }
  static forbidden(
    message = 'forbidden',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message: message,
      codeName: 'FORBIDDEN',
      httpCode: HttpStatus.FORBIDDEN,
      // gRPCCode: GrpcStatus.PERMISSION_DENIED,
      metadata: metadata,
    });
  }
  static conflict(
    message: string = 'Conflict',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message,
      codeName: 'CONFLICT',
      httpCode: HttpStatus.CONFLICT,
      // gRPCCode: GrpcStatus.ABORTED,
      metadata,
    });
  }
  static requestTimeout(
    message: string = 'Request Timeout',
    metadata?: Record<string, any>,
  ): BaseException {
    return new BaseException({
      message,
      codeName: 'REQUEST_TIMEOUT',
      httpCode: HttpStatus.REQUEST_TIMEOUT,
      // gRPCCode: GrpcStatus.DEADLINE_EXCEEDED,
      metadata,
    });
  }

  public readonly httpCode: HttpStatus; // gRPC or HTTP status code
  // public readonly gRPCCode: GrpcStatus; // gRPC error code
  public readonly codeName: string; // Application error code
  public readonly message: string;
  public readonly metadata?: Record<string, any>; // Additional data

  constructor({
    httpCode,
    // gRPCCode,
    codeName,
    message,
    metadata,
  }: {
    httpCode: number;
    // gRPCCode: number;
    codeName: string;
    message: string;
    metadata?: Record<string, any>;
  }) {
    super(message);
    this.httpCode = httpCode;
    // this.gRPCCode = gRPCCode;
    this.codeName = codeName;
    this.message = message;
    this.metadata = metadata;
  }

  toHttpException(): HttpException {
    return new HttpException(
      {
        isBaseException: true,
        httpCode: this.httpCode,
        // grpcCode: this.gRPCCode,
        message: this.message,
        codeName: this.codeName,
        metadata: this.metadata,
      },
      this.httpCode,
    );
  }

  // toRpcException() {
  //   return new RpcException({
  //     code: this.gRPCCode,
  //     message: JSON.stringify({
  //       isBaseException: true,
  //       httpCode: this.httpCode,
  //       grpcCode: this.gRPCCode,
  //       message: this.message,
  //       codeName: this.codeName,
  //       metadata: this.metadata,
  //     }),
  //   });
  // }
}
