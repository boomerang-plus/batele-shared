import { CustomDecorator, SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_META_KEY = 'isPublic';

export const Public = (): CustomDecorator<typeof IS_PUBLIC_META_KEY> =>
  SetMetadata(IS_PUBLIC_META_KEY, true);
