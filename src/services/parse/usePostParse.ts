import { API } from "@/constants/api";
import { postFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export interface PostParseBody {
  startDate?: string | null;
  endDate?: string | null;
}

export const usePostParse = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    API.PARSE.START,
    (url, { arg }: { arg?: PostParseBody }) =>
      postFetcher(url, arg, onSuccess, onError)
  );

  return { startParse: trigger, data, error, isMutating };
};
