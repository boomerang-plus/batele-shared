import { SetMetadata } from '@nestjs/common';
import { UserType } from '../constants/user-type.enum';

export const USER_TYPE_META_KEY = Symbol.for('UserType');

export type UserTypesDecorator = (
  ...userTypes: UserType[]
) => ClassDecorator | MethodDecorator;

export const UserTypes: UserTypesDecorator = (...userTypes: UserType[]) =>
  SetMetadata(USER_TYPE_META_KEY, userTypes);
