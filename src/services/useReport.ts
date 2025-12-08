import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useReportListStore, useUIStore } from "@/store";

interface useReportProps {
  enabled?: boolean;
}

// 리포트 데이터를 조회하는 커스텀 훅
export const useReport = ({ enabled = true }: useReportProps) => {
  const { selectedPatientId: patientId } = useReportListStore();
  const { setRefetchFn } = useUIStore();

  const query = useQuery({
    queryKey: QUERY_KEYS.REPORT.DETAIL(patientId?.toString() ?? ""),
    queryFn: () => reportApi.getReport(patientId?.toString() ?? ""),
    enabled: enabled,
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
