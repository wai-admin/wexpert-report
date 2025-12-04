import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useMessageStore } from "@/store";
import { getPatientId, hasValidPatientId } from "@/utils";

interface usePatientReportListProps {
  enabled?: boolean;
}

export const usePatientReportList = ({
  enabled = true,
}: usePatientReportListProps) => {
  const { nativeMessage } = useMessageStore();
  const patientId = getPatientId(nativeMessage);

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.PATIENT_LIST(patientId),
    queryFn: () => reportApi.getPatientReportList(patientId),
    enabled: enabled && hasValidPatientId(nativeMessage),
    staleTime: 0,
    retry: false, // 자동 재시도 제거 - 사용자가 버튼으로 재시도
  });

  return {
    ...query,
    patientId,
  };
};
