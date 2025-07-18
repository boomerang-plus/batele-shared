import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../interfaces';

export const getUserFromExecutionContext = (
  context: ExecutionContext,
): JwtPayload | null => {
  switch (context.getType()) {
    case 'http': {
      const req = context.switchToHttp().getRequest();
      const user = req.user as JwtPayload | undefined;
      return user ?? null;
    }
    case 'rpc': {
      const req = context.switchToRpc().getContext();
      const user = req.user as JwtPayload | undefined;
      return user ?? null;
    }
    default: {
      return null;
    }
  }
};

type CurrentUserDecorator = (data?: keyof JwtPayload) => ParameterDecorator;

export const CurrentUser: CurrentUserDecorator = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    try {
      const user = getUserFromExecutionContext(context);
      if (!data) return user;
      return user?.[data];
    } catch (error) {
      const logger = new Logger('@CurrentUser()');
      logger.error(error);
      throw new UnauthorizedException('User not found');
    }
  },
);
