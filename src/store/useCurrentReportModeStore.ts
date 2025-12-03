import { useMemo } from "react";
import { useMessageStore } from "./useMessageStore";
import { usePatientControllerStore } from "./usePatientControllerStore";
import { ReportOptionType } from "@/lib/nativeMessageType";
import { CurrentReportModeValues, ReportTabValues } from "@/types";
import { checkFalsy } from "@/utils";

export interface ReportModeResult {
  currentReportMode: CurrentReportModeValues;
  initialReportMode: ReportOptionType | null;
  isNewReportMode: boolean;
  isPatientReportMode: boolean;
  isAllReportMode: boolean;
}

const defaultReportModeResult: ReportModeResult = {
  currentReportMode: CurrentReportModeValues.NONE,
  initialReportMode: null,
  isNewReportMode: false,
  isPatientReportMode: false,
  isAllReportMode: false,
};

/**
 * 현재 리포트 모드와 초기 입장 옵션을 계산하는 순수 함수
 * React 컴포넌트 외부에서도 사용 가능
 */
export const getCurrentReportMode = (): ReportModeResult => {
  const nativeMessage = useMessageStore.getState().nativeMessage;
  const selectedReportTab =
    usePatientControllerStore.getState().selectedReportTab;

  // nativeMessage가 없으면 NONE
  if (checkFalsy(nativeMessage)) {
    return defaultReportModeResult;
  }

  const { reportMode } = nativeMessage;

  // ALL_REPORT_HISTORY 모드
  if (reportMode === ReportOptionType.ALL_REPORT_HISTORY) {
    return {
      currentReportMode: CurrentReportModeValues.ALL_REPORT_HISTORY,
      initialReportMode: reportMode,
      isNewReportMode: false,
      isPatientReportMode: false,
      isAllReportMode: true,
    };
  }

  // PATIENT_REPORT_HISTORY 모드
  if (reportMode === ReportOptionType.PATIENT_REPORT_HISTORY) {
    return {
      currentReportMode: CurrentReportModeValues.PATIENT_REPORT_HISTORY,
      initialReportMode: reportMode,
      isNewReportMode: false,
      isPatientReportMode: true,
      isAllReportMode: false,
    };
  }

  // NEW_REPORT 모드 - 선택된 탭에 따라 결정
  if (reportMode === ReportOptionType.NEW_REPORT) {
    if (selectedReportTab === ReportTabValues.NEW_REPORT) {
      return {
        currentReportMode: CurrentReportModeValues.NEW_REPORT,
        initialReportMode: reportMode,
        isNewReportMode: true,
        isPatientReportMode: false,
        isAllReportMode: false,
      };
    }

    if (selectedReportTab === ReportTabValues.REPORT_HISTORY) {
      return {
        currentReportMode: CurrentReportModeValues.PATIENT_REPORT_HISTORY,
        initialReportMode: reportMode,
        isNewReportMode: false,
        isPatientReportMode: true,
        isAllReportMode: false,
      };
    }
  }

  // 기본값
  return defaultReportModeResult;
};

/**
 * 현재 리포트 모드와 초기 입장 옵션을 반환하는 훅
 * React 컴포넌트 내에서 사용
 */
export const useCurrentReportModeStore = (): ReportModeResult => {
  // Zustand selector로 필요한 값만 구독
  const nativeMessage = useMessageStore((state) => state.nativeMessage);
  const selectedReportTab = usePatientControllerStore(
    (state) => state.selectedReportTab
  );

  // 의존성이 변경될 때만 재계산
  return useMemo(() => {
    return getCurrentReportMode();
  }, [nativeMessage, selectedReportTab]);
};
