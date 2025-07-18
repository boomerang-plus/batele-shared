import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMS_META_KEY } from '../decorators/permission.decorator';
import { JwtPayload } from '../interfaces';

const arrayIncludesOneOf = (arr: string[], arr2: string[]) =>
  arr.some((item) => arr2.includes(item));

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<string[]>(
      PERMS_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user) return false;

    switch (user.type) {
      case 'user':
        return false;
      case 'admin': {
        return arrayIncludesOneOf(user.permissions ?? [], permissions);
      }
      case 'member': {
        return arrayIncludesOneOf(user.permissions ?? [], permissions);
      }
      default:
        return false;
    }
  }
}
