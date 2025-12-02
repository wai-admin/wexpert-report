import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib";
import { useMessageStore } from "@/store";
import { getPatientId } from "@/utils";

/**
 * 리포트 관련 캐시를 무효화하는 훅
 * 리포트 업로드, 삭제 등의 mutation 후 사용
 */
export const useInvalidateReportCache = () => {
  const queryClient = useQueryClient();
  const { nativeMessage } = useMessageStore();
  const patientId = getPatientId(nativeMessage);

  /**
   * 특정 환자의 리포트 리스트 캐시 무효화
   */
  const invalidatePatientReportList = (customPatientId?: string) => {
    const targetPatientId = customPatientId || patientId;

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.REPORT.PATIENT_LIST(targetPatientId),
    });

    console.log("[Cache] Invalidating patient report list");
  };

  /**
   * 모든 전체 환자 리포트 리스트 캐시 무효화
   * 모든 필터 조합의 캐시를 무효화
   */
  const invalidateAllPatientReportList = () => {
    queryClient.invalidateQueries({
      queryKey: ["report", "all", "list"],
      exact: false, // 부분 매칭 허용
    });

    console.log("[Cache] Invalidating all patient report lists (all filters)");
  };

  /**
   * 특정 환자의 리포트 상세 캐시 무효화
   */
  const invalidatePatientReportDetail = (
    reportId: string,
    customPatientId?: string
  ) => {
    const targetPatientId = customPatientId || patientId;

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.REPORT.PATIENT_DETAIL(targetPatientId, reportId),
    });

    console.log("[Cache] Invalidating patient report detail");
  };

  /**
   * 모든 리포트 관련 캐시 제거 (완전 삭제)
   */
  const removeAllReportCaches = () => {
    queryClient.removeQueries({
      queryKey: ["report"],
      exact: false,
    });

    console.log("[Cache] All report caches removed");
  };

  return {
    invalidatePatientReportList,
    invalidateAllPatientReportList,
    invalidatePatientReportDetail,
    removeAllReportCaches,
  };
};
