// src/services/usePredict.ts
import useSWR from "swr";
import { API } from "@/constants/api";
import { getFetcher, refresh } from "@/lib/fetcher";
import { IStockPrediction } from "@/types/api";

export const useGetStockPredictions = (
  onSuccess?: (data: IStockPrediction[]) => void,
  onError?: (error: unknown) => void
) => {
  const key: [string] = [API.STOCK.PREDICTIONS];
  return useSWR<IStockPrediction[]>(key, ([url]) =>
    getFetcher(url, undefined, onSuccess, onError)
  );
};

export const refreshStockPredictions = async () => {
  await refresh(API.STOCK.PREDICTIONS);
};
