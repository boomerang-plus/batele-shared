import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type BearerTokenDecorator = (data?: unknown) => ParameterDecorator;

export const BearerToken: BearerTokenDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return;
    }

    const [prefix, token] = authorizationHeader.split(' ');

    if (prefix !== 'Bearer' || !token) {
      return;
    }

    return token;
  },
);
