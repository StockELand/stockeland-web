// src/services/usePredict.ts
import useSWR, { mutate } from "swr";
import { API } from "@/constants/api";
import { getFetcher } from "@/lib/fetcher";
import { IStock } from "@/types/table";

export const useGetStockAll = (
  onSuccess?: (data: IStock[]) => void,
  onError?: (error: unknown) => void
) => {
  const key: [string] = [API.STOCK.ALL];
  return useSWR<IStock[]>(key, ([url]) =>
    getFetcher(url, undefined, onSuccess, onError)
  );
};

export const refreshStockAll = async () => {
  const key = [API.STOCK.ALL];
  await mutate(key);
};
