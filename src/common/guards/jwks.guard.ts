import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwksService } from '../../jwks/jwks.service';
import { IS_PUBLIC_META_KEY } from '../decorators/public.decorator';
import { BaseException } from '../exceptions/base.exception';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwksGuard implements CanActivate {
  private readonly logger = new Logger(JwksGuard.name);
  constructor(
    private readonly jwksService: JwksService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) return true;

    switch (context.getType()) {
      case 'http':
        return this.handleHttp(context);
      // case 'rpc':
      //   return this.handleRpc(context);
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
    const authHeader = request.headers.authorization;

    if (!authHeader) throw BaseException.unauthorized('No token provided');

    const token = this.extractBearerToken(authHeader);

    if (!token) throw BaseException.unauthorized('No token provided');

    const jwtPayload = await this.getJwtPayloadFromToken(token);

    this.assignUserToRequest(request, jwtPayload);

    return true;
  }

  // private async handleRpc(context: ExecutionContext): Promise<boolean> {
  //   const metadata = context.switchToRpc().getContext<Metadata>();
  //   const request = context.switchToRpc().getContext();

  //   const authHeader = metadata.get('Authorization').at(0) as string;

  //   if (!authHeader) throw BaseException.unauthorized('No token provided');

  //   const token = this.extractBearerToken(authHeader);

  //   if (!token) throw BaseException.unauthorized('No token provided');

  //   const jwtPayload = await this.getJwtPayloadFromToken(token);

  //   this.assignUserToRequest(request, jwtPayload);

  //   return true;
  // }

  private extractBearerToken(str: string): string | null {
    const [type, token] = str.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private async getJwtPayloadFromToken(token: string): Promise<JwtPayload> {
    const jwt = await this.jwksService.verifyAccessToken(token);

    if (!jwt.success) throw BaseException.unauthorized('Invalid token');

    const payload = this.jwksService.parseJwt(jwt.data.payload);

    if (!payload.success) throw BaseException.unauthorized('Invalid token');

    return payload.data;
  }

  private assignUserToRequest(request: Request, payload: JwtPayload) {
    request['user'] = payload;
  }
}
