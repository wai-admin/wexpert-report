import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { AllPatientReportListParams, QUERY_KEYS } from "@/lib/queryKeys";
import {
  SortBy,
  SortOrder,
  useAllPatientsFilterStore,
  useUIStore,
} from "@/store";

export const useAllPatientReportList = () => {
  const { searchKeyword, currentPage, rowsPerPage, sortBy, sortOrder } =
    useAllPatientsFilterStore();
  const { setRefetchFn } = useUIStore();

  const params: AllPatientReportListParams = {
    query: searchKeyword,
    page: currentPage,
    limit: rowsPerPage,
    sort_by: sortBy === SortBy.NAME ? "PATIENT_NAME" : "REPORT_CREATED_AT",
    order: sortOrder === SortOrder.ASC ? "ASC" : "DESC",
  };

  // URL 파라미터 구성
  const searchParams = new URLSearchParams({
    query: params.query,
    page: params.page.toString(),
    limit: params.limit.toString(),
    sort_by: params.sort_by,
    order: params.order,
  });

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.ALL_PATIENT_LIST(params),
    queryFn: () => reportApi.getAllPatientReportList(searchParams),
    staleTime: 1 * 60 * 1000, // 1분 동안은 신선한 것으로 간주
    retry: false, // 자동 재시도 비활성화
  });

  // refetch 함수를 UIStore에 저장
  useEffect(() => {
    if (query.isError) {
      setRefetchFn(() => query.refetch);
    }
  }, [query.isError, query.refetch]);

  return {
    ...query,
  };
};
