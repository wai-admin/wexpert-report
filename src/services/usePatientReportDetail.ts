import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useMessageStore } from "@/store";
import { checkTruthy, getPatientId, hasValidPatientId } from "@/utils";

interface usePatientReportDetailProps {
  reportId: string;
  patientId?: string; // 옵션으로 외부에서 제공 가능
  enabled?: boolean;
}

export const usePatientReportDetail = ({
  reportId,
  patientId: externalPatientId,
  enabled = true,
}: usePatientReportDetailProps) => {
  const { nativeMessage } = useMessageStore();
  const messagePatientId = getPatientId(nativeMessage);

  // 외부에서 제공된 patientId 우선, 없으면 nativeMessage에서 추출
  const patientId = externalPatientId ?? messagePatientId;

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.PATIENT_DETAIL(patientId, reportId),
    queryFn: () => reportApi.getPatientReportDetail(patientId, reportId),
    enabled:
      enabled && hasValidPatientId(nativeMessage) && checkTruthy(reportId),
    // TODO: prod에서 statleTime 활성화하기 (캐시)
    // staleTime: 1 * 60 * 1000, // 1분 동안은 신선한 것으로 간주
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
