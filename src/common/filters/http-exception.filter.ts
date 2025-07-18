import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseException } from '../exceptions/base.exception';

@Catch(BaseException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: BaseException) {
    throw exception.toHttpException();
  }
}
