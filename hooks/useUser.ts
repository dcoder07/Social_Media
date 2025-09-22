import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  const { data, error, isValidating, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useUser;
