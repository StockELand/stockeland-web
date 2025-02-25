import { API } from "@/constants/api";
import { postFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export interface PostPredictBody {
  date?: string | null;
}

export const usePostPredict = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    API.PREDICT.START,
    (url, { arg }: { arg: PostPredictBody }) =>
      postFetcher(url, arg, onSuccess, onError)
  );

  return { startPredict: trigger, data, error, isMutating };
};
