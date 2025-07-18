import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_META_KEY = 'isPublic';

type PublicDecorator = () => ClassDecorator | MethodDecorator;

export const Public: PublicDecorator = () =>
  SetMetadata(IS_PUBLIC_META_KEY, true);
