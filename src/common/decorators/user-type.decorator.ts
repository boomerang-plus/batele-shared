import { SetMetadata } from '@nestjs/common';
import { UserType } from '../constants/user-type.enum';

export const USER_TYPE_META_KEY = Symbol.for('UserType');

export const UserTypes = (...userTypes: UserType[]) =>
  SetMetadata(USER_TYPE_META_KEY, userTypes);
