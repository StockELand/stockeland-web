import useSWR from "swr";
import { API } from "@/constants/api";
import { getFetcher, refresh } from "@/lib/fetcher";
import { IStockPrice } from "@/types/api";

export interface GetStockBySymbolQuery {
  symbol: string;
}

export const useGetStockBySymbol = (
  payload?: GetStockBySymbolQuery,
  onSuccess?: (data: IStockPrice[]) => void,
  onError?: (error: unknown) => void
) => {
  // SWR key should be `null` if `symbol` is missing to prevent requests
  const key = payload?.symbol
    ? [API.STOCK.BYSYMBOL + "/" + payload.symbol]
    : null;

  const { data, error, isLoading } = useSWR(
    key,
    key ? ([url]) => getFetcher(url, payload, onSuccess, onError) : null
  );

  return { data, error, isLoading };
};

export const refreshStockBySymbol = async (payload?: GetStockBySymbolQuery) => {
  if (!payload?.symbol) return; // Prevent refreshing when symbol is missing
  await refresh(API.STOCK.BYSYMBOL + "/" + payload.symbol);
};
