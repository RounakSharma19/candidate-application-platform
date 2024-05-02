/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type CustomUseQueryResult<TData, TError> = {
  totalCount: number;
} & UseQueryResult<TData, TError>;

export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): CustomUseQueryResult<TData, TError> => {
  const [totalCount, setTotalCount] = useState(0);

  const result = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options,
  });

  useEffect(() => {
    if (
      (result?.data as unknown as any)?.data?.data?.totalItems &&
      typeof (result?.data as unknown as any)?.data?.data?.totalItems ===
        "number"
    ) {
      setTotalCount((result?.data as unknown as any)?.data?.data?.totalItems);
    }
  }, [result?.data]);

  return { ...result, totalCount };
};
