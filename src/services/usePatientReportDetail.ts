import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useReportListStore } from "@/store";

interface usePatientReportDetailProps {
  enabled?: boolean;
}

export const usePatientReportDetail = ({
  enabled = true,
}: usePatientReportDetailProps) => {
  const { selectedReportId: reportId, selectedPatientId: patientId } =
    useReportListStore();

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.PATIENT_DETAIL(
      patientId?.toString() ?? "",
      reportId?.toString() ?? ""
    ),
    queryFn: () =>
      reportApi.getPatientReportDetail(
        patientId?.toString() ?? "",
        reportId?.toString() ?? ""
      ),
    enabled: enabled,
    staleTime: 1 * 60 * 1000, // 1분 동안은 신선한 것으로 간주
    retry: (failureCount, error: any) => {
      // 실패 시 오류 로그
      console.error(`Report fetch failed (attempt ${failureCount + 1}):`, {
        patientId,
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
