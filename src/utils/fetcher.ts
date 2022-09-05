export const fetcher = async <T>(
  url: string,
  config: { baseUrl: string } = {
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  }
): Promise<T> => {
  const res = await fetch(`${config.baseUrl}/api/${url}`);
  return res.json();
};
