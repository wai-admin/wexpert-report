import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useMessageStore } from "@/store";
import { getPatientId, hasValidPatientId } from "@/utils";

interface useReportProps {
  enabled?: boolean;
}

// 리포트 데이터를 조회하는 커스텀 훅
export const useReport = ({ enabled = true }: useReportProps) => {
  const { nativeMessage } = useMessageStore();
  const patientId = getPatientId(nativeMessage);

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.DETAIL(patientId),
    queryFn: () => reportApi.getReport(patientId),
    enabled: enabled && hasValidPatientId(nativeMessage),
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
    patientId,
  };
};
