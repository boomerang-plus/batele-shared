import { Type } from '@nestjs/common';
import { VerifyOptions } from 'jsonwebtoken';

export interface JwksServiceConfig {
  jwksUri: string;
  cache?: boolean;
  rateLimit?: boolean;
  jwksRequestsPerMinute?: number;
  verifyOptions?: VerifyOptions;
  appSecret: string;
}

export interface JwksModuleOptions {
  config: JwksServiceConfig;
  isGlobal?: boolean;
}

export interface JwksModuleOptionsFactory {
  create(): Promise<JwksServiceConfig> | JwksServiceConfig;
}

export interface JwksModuleAsyncOptions {
  isGlobal?: boolean;
  imports?: any[];
  useExisting?: Type<JwksModuleOptionsFactory>;
  useClass?: Type<JwksModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<JwksServiceConfig> | JwksServiceConfig;
  inject?: any[];
}
