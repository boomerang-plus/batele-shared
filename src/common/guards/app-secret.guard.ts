import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_META_KEY } from '../decorators';
import { BaseException } from '../exceptions';
import { JWKS_SERVICE_CONFIG, JwksServiceConfig } from 'src/jwks';

export class AppSecretGuard implements CanActivate {
  private readonly logger = new Logger(AppSecretGuard.name);
  constructor(
    private readonly reflector: Reflector,
    @Inject(JWKS_SERVICE_CONFIG)
    private readonly jwksConfig: JwksServiceConfig,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) return true;

    switch (context.getType()) {
      case 'http':
        return this.handleHttp(context);
      default:
        return false;
    }
  }

  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async handleHttp(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) throw BaseException.unauthorized('No token provided');

    if (apiKey !== this.jwksConfig.appSecret) {
      throw BaseException.forbidden('Invalid secret');
    }

    return true;
  }
}
