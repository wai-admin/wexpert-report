import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/services/queryKeys";
import { useReportListStore, useUIStore } from "@/store";
import { checkTruthy } from "@/utils";

interface usePatientReportDetailProps {
  enabled?: boolean;
}

export const usePatientReportDetail = ({
  enabled = true,
}: usePatientReportDetailProps) => {
  const { selectedReportId: reportId, selectedPatientId: patientId } =
    useReportListStore();
  const { setRefetchFn } = useUIStore();

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
    enabled: enabled && checkTruthy(patientId) && checkTruthy(reportId),
    staleTime: 1 * 60 * 1000, // 1분 동안은 신선한 것으로 간주
    retry: false, // 자동 재시도 비활성화
  });

  // refetch 함수를 UIStore에 저장
  useEffect(() => {
    if (query.isError) {
      setRefetchFn(() => {
        query.refetch();
      });
    }
  }, [query.isError, query.refetch]);

  return {
    ...query,
  };
};
