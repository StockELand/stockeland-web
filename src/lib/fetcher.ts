/* eslint-disable @typescript-eslint/no-explicit-any */

import { mutate } from "swr";

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

/**
 * SWR 캐시를 엔드포인트 기준으로 갱신하는 유틸 함수
 * @param endpoint - 갱신할 엔드포인트 URL
 * @param payload - 선택적 payload, 있으면 해당 요청만 갱신, 없으면 전체 갱신
 */
export const refresh = async <T>(endpoint: string, payload?: T) => {
  if (payload) {
    const key = [endpoint, payload];
    await mutate(key);
  } else {
    await mutate((key) => {
      if (typeof key === "string") {
        return key === endpoint;
      }
      if (Array.isArray(key)) {
        return key[0] === endpoint;
      }
      return false;
    });
  }
};
