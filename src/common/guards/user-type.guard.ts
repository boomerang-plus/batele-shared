import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_TYPE_META_KEY } from '../decorators/user-type.decorator';
import { JwtPayload } from '../interfaces';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const userTypes = this.reflector.getAllAndOverride<string[]>(
      USER_TYPE_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!userTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user) return false;

    return userTypes.includes(user.type);
  }
}
