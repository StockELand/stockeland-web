import { API } from "@/constants/api";
import { postFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export const usePostParse = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    API.PARSE.START,
    (url) => postFetcher(url, undefined, onSuccess, onError)
  );

  return { startParse: trigger, data, error, isMutating };
};
