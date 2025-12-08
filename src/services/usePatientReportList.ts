import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useReportListStore, useUIStore } from "@/store";
import { checkTruthy } from "@/utils";

interface usePatientReportListProps {
  enabled?: boolean;
}

export const usePatientReportList = ({
  enabled = true,
}: usePatientReportListProps) => {
  const { selectedPatientId: patientId } = useReportListStore();
  const { setRefetchFn } = useUIStore();

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.PATIENT_LIST(patientId?.toString() ?? ""),
    queryFn: () => reportApi.getPatientReportList(patientId?.toString() ?? ""),
    enabled: enabled && checkTruthy(patientId),
    staleTime: 0,
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
