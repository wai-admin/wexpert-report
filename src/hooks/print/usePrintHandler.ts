import { useEffect, useMemo } from "react";
import { useReport } from "@/services/useReport";
import {
  useNewReportStore,
  useLoadingStore,
  useErrorStore,
  useCurrentReportMode,
} from "@/store";
import { UsePrintHandlerReturn } from "@/types";
import { checkTruthy } from "@/utils";
import { usePatientReportDetail } from "@/services/usePatientReportDetail";
import {
  buildHistoryPrintResult,
  buildNewReportPrintResult,
} from "@/utils/printTransform";

const usePrintHandler = (): UsePrintHandlerReturn => {
  /**
   * @description: 훅 플로우
   * 1. Bridge Message Store에서 현재 타입 읽기
   * 2. 타입에 따라 적절한 데이터 훅 호출
   *    - new-report → useReport
   *    - report-history / all-report-history → usePatientReportDetail
   * 3. PrintPage용 데이터 변환 및 메모이제이션
   * 4. { printData } 반환
   */

  // Store
  const { imageExportOption, physicianAssessment } = useNewReportStore();
  const { isNewReportMode, isPatientReportMode, isAllReportMode } =
    useCurrentReportMode();
  const { setLoading } = useLoadingStore();
  const { setError } = useErrorStore();

  // 모드별 데이터 fetching
  const {
    data: newReport,
    isFetching: isNewReportFetching,
    error: newReportError,
  } = useReport({ enabled: isNewReportMode });

  const {
    data: reportHistoryDetail,
    isFetching: isHistoryDetailFetching,
    error: historyDetailError,
  } = usePatientReportDetail({
    enabled: isPatientReportMode || isAllReportMode,
  });

  // 로딩 상태 동기화
  useEffect(() => {
    setLoading(isNewReportFetching || isHistoryDetailFetching);
  }, [isNewReportFetching, isHistoryDetailFetching, setLoading]);

  // 에러 상태 동기화
  useEffect(() => {
    setError(newReportError || historyDetailError);
  }, [newReportError, historyDetailError, setError]);

  // Report History 데이터 메모이제이션
  const historyResult = useMemo(() => {
    const isValidReportHistoryData =
      checkTruthy(reportHistoryDetail) &&
      (isPatientReportMode || isAllReportMode);
    if (isValidReportHistoryData) {
      return buildHistoryPrintResult(reportHistoryDetail.data);
    }

    return null;
  }, [reportHistoryDetail, isPatientReportMode, isAllReportMode]);

  // New Report 데이터 메모이제이션
  const newReportResult = useMemo(() => {
    const isValidNewReportData = checkTruthy(newReport) && isNewReportMode;
    if (isValidNewReportData) {
      return buildNewReportPrintResult(
        newReport.data,
        imageExportOption,
        physicianAssessment
      );
    }

    return null;
  }, [newReport, isNewReportMode, imageExportOption, physicianAssessment]);

  if (checkTruthy(historyResult)) {
    return historyResult;
  }

  if (checkTruthy(newReportResult)) {
    return newReportResult;
  }

  // Fallback (데이터 로딩 중 또는 없음)
  return {
    printData: null,
  };
};

export default usePrintHandler;
