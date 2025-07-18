import { SetMetadata } from '@nestjs/common';
import { OrgPermission } from '../constants/org-permission.enum';

export const PERMS_META_KEY = Symbol('Permission');

export type PermsDecorator = (
  ...permissions: OrgPermission[]
) => ClassDecorator | MethodDecorator;

export const Perms: PermsDecorator = (...permissions: OrgPermission[]) =>
  SetMetadata(PERMS_META_KEY, permissions);
