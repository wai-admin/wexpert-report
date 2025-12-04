import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { checkTruthy } from "@/utils";

interface usePatientReportDetailProps {
  reportId: string;
  patientId: string;
  enabled?: boolean;
}

export const usePatientReportDetail = ({
  reportId,
  patientId,
  enabled = true,
}: usePatientReportDetailProps) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.PATIENT_DETAIL(patientId, reportId),
    queryFn: () => reportApi.getPatientReportDetail(patientId, reportId),
    enabled: enabled && checkTruthy(reportId) && checkTruthy(patientId),
    staleTime: 1 * 60 * 1000, // 1분 동안은 신선한 것으로 간주
    retry: false, // 자동 재시도 제거 - 사용자가 버튼으로 재시도
  });

  return {
    ...query,
    patientId,
  };
};
