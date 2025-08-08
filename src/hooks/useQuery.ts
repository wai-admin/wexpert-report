import {
  useQuery as useTanStackQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";

/**
 * 기본 useQuery hook - TanStack Query의 useQuery를 감싸서 프로젝트에 맞게 커스터마이징
 */
export const useQuery = <TData = unknown, TError = Error>(
  options: UseQueryOptions<TData, TError>
) => {
  return useTanStackQuery(options);
};

/**
 * 기본 useMutation hook - TanStack Query의 useMutation을 감싸서 프로젝트에 맞게 커스터마이징
 */
export const useMutationHook = <
  TData = unknown,
  TError = Error,
  TVariables = void
>(
  options: UseMutationOptions<TData, TError, TVariables>
) => {
  return useMutation(options);
};

/**
 * QueryClient 접근을 위한 hook
 */
export const useQueryClientHook = () => {
  return useQueryClient();
};

/**
 * 특정 쿼리를 무효화하는 helper hook
 */
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: QueryKey) => {
    return queryClient.invalidateQueries({ queryKey });
  };

  return { invalidateQuery };
};

/**
 * 쿼리 데이터를 직접 설정하는 helper hook
 */
export const useSetQueryData = () => {
  const queryClient = useQueryClient();

  const setQueryData = <TData>(
    queryKey: QueryKey,
    data: TData | ((oldData: TData | undefined) => TData)
  ) => {
    return queryClient.setQueryData(queryKey, data);
  };

  return { setQueryData };
};

/**
 * 특정 쿼리의 캐시된 데이터를 가져오는 hook
 */
export const useGetQueryData = () => {
  const queryClient = useQueryClient();

  const getQueryData = <TData>(queryKey: QueryKey): TData | undefined => {
    return queryClient.getQueryData(queryKey);
  };

  return { getQueryData };
};

/**
 * 여러 쿼리를 한 번에 무효화하는 helper hook
 */
export const useInvalidateMultipleQueries = () => {
  const queryClient = useQueryClient();

  const invalidateMultipleQueries = (queryKeys: QueryKey[]) => {
    return Promise.all(
      queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
    );
  };

  return { invalidateMultipleQueries };
};
