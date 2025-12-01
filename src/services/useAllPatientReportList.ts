import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { AllPatientReportListParams, QUERY_KEYS } from "@/lib/queryKeys";
import { SortBy, SortOrder, useAllPatientsFilterStore } from "@/store";

export const useAllPatientReportList = () => {
  const { searchKeyword, currentPage, rowsPerPage, sortBy, sortOrder } =
    useAllPatientsFilterStore();

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
    retry: (failureCount, error: any) => {
      // 실패 시 오류 로그
      console.error(`Report fetch failed (attempt ${failureCount + 1}):`, {
        error: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        timestamp: new Date().toISOString(),
      });

      // 네트워크 오류나 5xx 서버 오류는 재시도
      const isNetworkOrServerError =
        error.message.includes("Network") ||
        (error.response?.status && error.response.status >= 500);

      if (isNetworkOrServerError) {
        console.log(`Retrying... (${failureCount + 1}/2)`);
        return failureCount < 2;
      }

      // 4xx 클라이언트 오류는 재시도하지 않음
      console.log("Client error - not retrying");
      return false;
    },
    // 1번째 재시도: 1초 딜레이, 2번째 재시도: 2초 딜레이
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    ...query,
  };
};
