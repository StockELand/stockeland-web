// src/services/usePredict.ts
import useSWR, { mutate } from "swr";
import { API } from "@/constants/api";
import { getFetcher } from "@/lib/fetcher";
import { IPredictionLog } from "@/types/table";

export interface GetPredictionLogQuery {
  date?: string | null;
}

export const useGetPredictionLog = (
  payload?: GetPredictionLogQuery,
  onSuccess?: (data: IPredictionLog[]) => void,
  onError?: (error: unknown) => void
) => {
  const key: [string, GetPredictionLogQuery?] = [API.PREDICT.LOGS, payload];
  const { data, error, isLoading } = useSWR(key, ([url, payload]) =>
    getFetcher(url, payload, onSuccess, onError)
  );
  return { data, error, isLoading };
};

export const refreshPredictionLog = async (payload?: GetPredictionLogQuery) => {
  const key = [API.PREDICT.LOGS, payload];
  await mutate(key);
};
