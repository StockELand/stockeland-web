// src/services/usePredict.ts
import useSWR from "swr";
import { API } from "@/constants/api";
import { getFetcher, refresh } from "@/lib/fetcher";
import { IPredictionData } from "@/types/table";

export interface GetPredictionsQuery {
  date?: string | null;
}

export const useGetPredictions = (
  payload?: GetPredictionsQuery,
  onSuccess?: (data: IPredictionData[]) => void,
  onError?: (error: unknown) => void
) => {
  const key: [string, GetPredictionsQuery?] = [API.PREDICT.DATA, payload];
  const { data, error, isLoading } = useSWR(key, ([url, payload]) =>
    getFetcher(url, payload, onSuccess, onError)
  );
  return { data, error, isLoading };
};

export const refreshPredictions = async (payload?: GetPredictionsQuery) => {
  await refresh(API.PREDICT.DATA, payload);
};
