import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwksService } from './jwks.service';
import { JwksModuleOptions } from './jwks.interface';
import { JWKS_MODULE_OPTIONS } from './jwks.constants';

@Global()
@Module({
  providers: [JwksService],
  exports: [JwksService],
})
export class JwksModule {
  static forRoot(options: JwksModuleOptions): DynamicModule {
    return {
      module: JwksModule,
      providers: [
        {
          provide: JWKS_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
