import { Inject, Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { JwtPayload } from '../common/interfaces';
import { JwtPayloadSchema } from './validation/jwt-payload.schema';
import { AsyncResult, Result, Resulter } from '../result';
import { JWKS_SERVICE_CONFIG } from './jwks.constants';
import { JwksServiceConfig } from './jwks.interface';

@Injectable()
export class JwksService {
  private readonly logger = new Logger(JwksService.name);
  private _client?: jwksClient.JwksClient;

  constructor(
    @Inject(JWKS_SERVICE_CONFIG)
    private readonly options: JwksServiceConfig,
  ) {}

  get client(): jwksClient.JwksClient {
    this._client ??= jwksClient({
      jwksUri: this.options.jwksUri,
      cache: this.options.cache ?? true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    });

    return this._client;
  }

  parseJwt(payload: jwt.JwtPayload | string): Result<JwtPayload> {
    if (typeof payload === 'string') {
      try {
        return Resulter.ok(JwtPayloadSchema.parse(JSON.parse(payload)));
      } catch (error) {
        return Resulter.err(error);
      }
    }

    return JwtPayloadSchema.safeParse(payload);
  }

  async verify(
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.PublicKey,
    options: jwt.VerifyOptions,
  ): AsyncResult<jwt.Jwt> {
    return Resulter.try(() => {
      const data = jwt.verify(token, secretOrPublicKey, {
        algorithms: ['RS256', 'HS256'],
        ...options,
        complete: true,
      });

      return data;
    });
  }

  async verifyAccessToken(
    token: string,
    options: jwt.VerifyOptions = {},
  ): AsyncResult<jwt.Jwt> {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || typeof decoded === 'string')
      throw new Error('Invalid token');

    const kid = decoded.header.kid;

    const key = await this.client.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    const verifyResult = await this.verify(token, signingKey, {
      algorithms: this.options.verifyOptions?.algorithms ?? ['RS256'],
      ...options,
    });

    if (!verifyResult.success) {
      return Resulter.err(verifyResult.error);
    }

    return verifyResult;
  }
}
