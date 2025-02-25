// src/services/usePredict.ts
import useSWR, { mutate } from "swr";
import { API } from "@/constants/api";
import { getFetcher } from "@/lib/fetcher";
import { IParseLog } from "@/types/table";

export interface GetParseLogQuery {
  date?: string | null;
}

export const useGetParseLog = (
  payload?: GetParseLogQuery,
  onSuccess?: (data: IParseLog[]) => void,
  onError?: (error: unknown) => void
) => {
  const key: [string, GetParseLogQuery?] = [API.PARSE.LOGS, payload];
  const { data, error, isLoading } = useSWR(key, ([url, payload]) =>
    getFetcher(url, payload, onSuccess, onError)
  );
  return { data, error, isLoading };
};

export const refreshParseLog = async (payload?: GetParseLogQuery) => {
  const key = [API.PARSE.LOGS, payload];
  await mutate(key);
};
