import { Res } from '@nestjs/common';
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

(async () => {
  const a = await fetch('').then(
    (response) => Resulter.async(response.json()),
    (error) => Resulter.err<unknown>(error),
  );

  console.log(a);
})();
// class AsResult<T, E = unknown> implements Promise<T> {
//   then<TResult1 = T, TResult2 = never>(
//     onfulfilled?:
//       | ((value: T) => TResult1 | PromiseLike<TResult1>)
//       | null
//       | undefined,
//     onrejected?:
//       | ((reason: E) => TResult2 | PromiseLike<TResult2>)
//       | null
//       | undefined,
//   ): Promise<TResult1 | TResult2> {
//     throw new Error('Method not implemented.');
//   }

//   catch<TResult = never>(
//     onrejected?:
//       | ((reason: any) => TResult | PromiseLike<TResult>)
//       | null
//       | undefined,
//   ): Promise<T | TResult> {
//     throw new Error('Method not implemented.');
//   }

//   finally(onfinally?: (() => void) | null | undefined): Promise<T> {
//     throw new Error('Method not implemented.');
//   }
// }

const a = new Result2(true, 'hello', 'error');
