import { ReportTabValues } from "@/types";
import { create } from "zustand";
import { useReportListStore } from "./useReportListStore";

interface PatientControllerState {
  selectedReportTab: ReportTabValues;
  setSelectedReportTab: (tab: ReportTabValues) => void;
}

export const usePatientControllerStore = create<PatientControllerState>(
  (set) => ({
    selectedReportTab: ReportTabValues.NEW_REPORT,
    setSelectedReportTab: (tab) => {
      set({ selectedReportTab: tab });

      // NEW_REPORT 탭으로 변경 시 reportList를 비어있지 않음으로 설정
      if (tab === ReportTabValues.NEW_REPORT) {
        useReportListStore.getState().setIsReportListEmpty(false);
      }
    },
  })
);
