import { withAsync } from "./withAsync";

export const fetcher = async <T>(
  url: string,
  config: { baseUrl: string } = {
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  }
): Promise<T> => {
  const res = await fetch(`${config.baseUrl}/api/${url}`);
  return res.json();
};

export const api = (() => {
  const get = async <T>(
    url: string,
    config: { baseUrl: string } = {
      baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    }
  ): Promise<T> => {
    const { response, error } = await withAsync(() =>
      fetch(`${config.baseUrl}/api/${url}`)
    );
    if (response) {
      return response.json();
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  };

  const post = async <RequestType, ResponseType>(
    url: string,
    body: RequestType,
    config: { baseUrl: string } = {
      baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    }
  ): Promise<ResponseType> => {
    console.log(body);

    const { response, error } = await withAsync(() =>
      fetch(`${config.baseUrl}/api/${url}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(body || {}),
      })
    );

    if (response) {
      return response.json();
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  };

  return {
    get,
    post,
  };
})();
