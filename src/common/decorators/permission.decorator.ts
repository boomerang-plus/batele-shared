import { SetMetadata } from '@nestjs/common';
import { OrgPermission } from '../constants/org-permission.enum';

export const PERMS_META_KEY = Symbol('Permission');

export const Perms = (...permissions: OrgPermission[]) =>
  SetMetadata(PERMS_META_KEY, permissions);
