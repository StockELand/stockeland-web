// src/services/usePredict.ts
import useSWR, { mutate } from "swr";
import { API } from "@/constants/api";
import { getFetcher } from "@/lib/fetcher";
import { IParseData } from "@/types/table";

export interface GetParseDataQuery {
  date?: string | null;
}

export const useGetParseData = (
  payload?: GetParseDataQuery,
  onSuccess?: (data: IParseData[]) => void,
  onError?: (error: unknown) => void
) => {
  const key: [string, GetParseDataQuery?] = [API.PARSE.DATA, payload];
  const { data, error, isLoading } = useSWR(key, ([url, payload]) =>
    getFetcher(url, payload, onSuccess, onError)
  );
  return { data, error, isLoading };
};

export const refreshParseData = async (payload?: GetParseDataQuery) => {
  const key = [API.PARSE.DATA, payload];
  await mutate(key);
};
