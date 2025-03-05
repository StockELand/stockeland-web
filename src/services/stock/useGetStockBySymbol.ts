import useSWR from "swr";
import { API } from "@/constants/api";
import { getFetcher, refresh } from "@/lib/fetcher";
import { IStockPrice } from "@/types/api";

export interface GetStockBySymbolParam {
  symbol: string;
}

export interface GetStockBySymbolQuery {
  range?: string;
}

export const useGetStockBySymbol = (
  payload: GetStockBySymbolQuery & GetStockBySymbolParam,
  onSuccess?: (data: IStockPrice[]) => void,
  onError?: (error: unknown) => void
) => {
  const { symbol, ...query } = payload;
  const key: [string, GetStockBySymbolQuery?] = [
    API.STOCK.BYSYMBOL + "/" + symbol,
    query,
  ];

  const { data, error, isLoading } = useSWR(key, ([url, payload]) =>
    getFetcher(url, payload, onSuccess, onError)
  );

  return { data, error, isLoading };
};

export const refreshStockBySymbol = async (
  payload: GetStockBySymbolQuery & GetStockBySymbolParam
) => {
  const { symbol, ...query } = payload;
  await refresh(API.STOCK.BYSYMBOL + "/" + symbol, query);
};
