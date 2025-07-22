import { DynamicModule } from '@nestjs/common';
import { JwksService } from './jwks.service';
import { JwksModuleAsyncOptions, JwksModuleOptions } from './jwks.interface';
import { JWKS_SERVICE_CONFIG } from './jwks.constants';

export class JwksModule {
  static forRoot(options: JwksModuleOptions): DynamicModule {
    return {
      module: JwksModule,
      global: options.isGlobal,
      providers: [
        {
          provide: JWKS_SERVICE_CONFIG,
          useValue: options.config,
        },
        JwksService,
      ],
    };
  }

  static forRootAsync(options: JwksModuleAsyncOptions): DynamicModule {
    return {
      module: JwksModule,
      imports: options.imports,
      providers: [
        ...(options.imports || []),
        {
          provide: JWKS_SERVICE_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        JwksService,
      ],
      global: options.isGlobal,
      exports: [JwksService],
    };
  }
}
