type WithAsyncFn<T = unknown> = () => T | Promise<T>;

export async function withAsync<TData = unknown, TError = unknown>(
  fn: WithAsyncFn<TData>
): Promise<{
  response: TData | null;
  error: TError | unknown;
}> {
  try {
    if (typeof fn !== "function")
      throw new Error("The first argument must be a function");
    const response = await fn();
    return {
      response,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
}
