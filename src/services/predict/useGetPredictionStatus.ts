// src/services/usePredict.ts
import useSWR from "swr";
import { API } from "@/constants/api";
import { getFetcher, refresh } from "@/lib/fetcher";
import { DisplayDateGroup } from "@l11040/eland-datepicker";

export interface GetPredictionStatusQuery {
  startDate: string | null;
  endDate: string | null;
}

export const useGetPredictionStatus = (
  payload?: GetPredictionStatusQuery,
  onSuccess?: (data: { [key: string]: DisplayDateGroup }) => void,
  onError?: (error: unknown) => void
) => {
  const shouldFetch = !!payload?.startDate && !!payload?.endDate;

  const key: [string, GetPredictionStatusQuery?] = [
    API.PREDICT.STATUS,
    payload,
  ];

  const { data, error, isLoading } = useSWR(
    shouldFetch ? key : null,
    ([url, payload]) => getFetcher(url, payload, onSuccess, onError)
  );

  return { data, error, isLoading };
};

export const refreshPredictionStatus = async (
  payload?: GetPredictionStatusQuery
) => {
  await refresh(API.PREDICT.STATUS, payload);
};
