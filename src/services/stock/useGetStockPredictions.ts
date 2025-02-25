// src/services/usePredict.ts
import useSWR, { mutate } from "swr";
import { API } from "@/constants/api";
import { getFetcher } from "@/lib/fetcher";
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
  const key = [API.STOCK.PREDICTIONS];
  await mutate(key);
};
