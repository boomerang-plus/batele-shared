import { AsyncResult, ErrorResult, SuccessResult } from './result.types';

export class Resulter {
  static async try<T, E = unknown>(
    cb: () => T | Promise<T>,
  ): AsyncResult<T, E> {
    try {
      const data = await cb();
      return Resulter.ok(data);
    } catch (error) {
      return Resulter.err(error as E);
    }
  }

  static async async<T, E = unknown>(promise: Promise<T>): AsyncResult<T, E> {
    try {
      const data = await promise;
      return Resulter.ok(data);
    } catch (error) {
      return Resulter.err(error as E);
    }
  }

  static promise<T, E = unknown>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: E) => void,
    ) => void,
  ): AsyncResult<T> {
    return Resulter.async<T, E>(new Promise<T>(executor));
  }

  static ok<T>(data: T): SuccessResult<T> {
    return {
      success: true,
      data,
    };
  }

  static err<E = unknown>(error: E): ErrorResult<E> {
    return {
      success: false,
      error,
    };
  }
}
