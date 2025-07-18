import { Type } from '@nestjs/common';
import { VerifyOptions } from 'jsonwebtoken';

export interface JwksModuleOptions {
  jwksUri: string;
  cache?: boolean;
  rateLimit?: boolean;
  jwksRequestsPerMinute?: number;
  verifyOptions?: VerifyOptions;
}

export interface JwksModuleOptionsFactory {
  create(): Promise<JwksModuleOptions> | JwksModuleOptions;
}

export interface JwksModuleAsyncOptions {
  useExisting?: Type<JwksModuleOptionsFactory>;
  useClass?: Type<JwksModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<JwksModuleOptions> | JwksModuleOptions;
  inject?: any[];
}
