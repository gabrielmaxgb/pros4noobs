export class Result<T> {
  data: T | undefined;
  error: string | undefined;
  get isFailure(): boolean {
    return this.error !== undefined && this.data === undefined;
  }

  private constructor(data: T | undefined, error: string | undefined) {
    this.data = data;
    this.error = error;
  }

  public static Ok<T>(data: T): Result<T> {
    return new Result<T>(data, undefined);
  }

  public static Fail<T>(error: string): Result<T> {
    return new Result<T>(undefined, error);
  }
}