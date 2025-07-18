export type SuccessResult<T> = {
  success: true;
  data: T;
  error?: never;
};

export type ErrorResult<TError> = {
  success: false;
  data?: never;
  error: TError;
};

export type Result<T, E = unknown> = SuccessResult<T> | ErrorResult<E>;

export type AsyncResult<T, E = unknown> = Promise<Result<T, E>>;
