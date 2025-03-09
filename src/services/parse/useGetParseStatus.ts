// src/services/usePredict.ts
import useSWR from "swr";
import { API } from "@/constants/api";
import { getFetcher, refresh } from "@/lib/fetcher";
import { DisplayDateGroup } from "@l11040/eland-datepicker";

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
  await refresh(API.PARSE.STATUS, payload);
};
