export class Result<T> {
  data: T | null;
  error: string | null;
  get isFailure(): boolean {
    return this.error !== null && this.data === null;
  }

  private constructor(data: T | null, error: string | null) {
    this.data = data;
    this.error = error;
  }

  public static Ok<T>(data: T): Result<T> {
    return new Result<T>(data, null);
  }

  public static Fail<T>(error: string): Result<T> {
    return new Result<T>(null, error);
  }
}