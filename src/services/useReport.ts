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
    retry: false, // 자동 재시도 제거 - 사용자가 버튼으로 재시도
  });

  return {
    ...query,
    patientId,
  };
};
