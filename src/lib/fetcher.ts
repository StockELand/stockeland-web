/* eslint-disable @typescript-eslint/no-explicit-any */

const buildQueryString = (params: Record<string, unknown>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return query.toString();
};

const defaultHeaders = { "Content-Type": "application/json" };

// ✅ GET 요청 처리
export const getFetcher = async <T>(
  url: string,
  payload?: any,
  onSuccess?: (data: T) => void,
  onError?: (error: unknown) => void
): Promise<T> => {
  try {
    const queryString = payload ? `?${buildQueryString(payload)}` : "";
    const response = await fetch(`${url}${queryString}`, {
      method: "GET",
      headers: defaultHeaders,
    });

    if (!response.ok) throw new Error(`GET Failed: ${response.statusText}`);

    const data: T = await response.json();
    onSuccess?.(data);
    return data;
  } catch (error) {
    onError?.(error);
    console.error("GET API Error:", error);
    throw error;
  }
};

// ✅ POST 요청 처리
export const postFetcher = async <T>(
  url: string,
  payload?: any,
  onSuccess?: (data: T) => void,
  onError?: (error: unknown) => void
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: defaultHeaders,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) throw new Error(`POST Failed: ${response.statusText}`);

    const data: T = await response.json();
    onSuccess?.(data);
    return data;
  } catch (error) {
    onError?.(error);
    console.error("POST API Error:", error);
    throw error;
  }
};
