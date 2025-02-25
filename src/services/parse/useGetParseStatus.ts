// src/services/usePredict.ts
import useSWR, { mutate } from "swr";
import { API } from "@/constants/api";
import { getFetcher } from "@/lib/fetcher";
import { DisplayDateGroup } from "@/components/date-picker";

export interface GetParseStatusQuery {
  startDate: string | null;
  endDate: string | null;
}

export const useGetParseStatus = (
  payload?: GetParseStatusQuery,
  onSuccess?: (data: { [key: string]: DisplayDateGroup }) => void,
  onError?: (error: unknown) => void
) => {
  const shouldFetch = !!payload?.startDate && !!payload?.endDate;

  const key: [string, GetParseStatusQuery?] = [API.PARSE.STATUS, payload];

  const { data, error, isLoading } = useSWR(
    shouldFetch ? key : null,
    ([url, payload]) => getFetcher(url, payload, onSuccess, onError)
  );

  return { data, error, isLoading };
};

export const refreshPredictionStatus = async (
  payload?: GetParseStatusQuery
) => {
  const shouldFetch = !!payload?.startDate && !!payload?.endDate;

  if (!shouldFetch) return;

  const key = [API.PARSE.STATUS, payload];
  await mutate(key);
};
