import { ReportTabValues } from "@/types";
import { create } from "zustand";

interface PatientControllerState {
  selectedReportTab: ReportTabValues;
  setSelectedReportTab: (tab: ReportTabValues) => void;
}

export const usePatientControllerStore = create<PatientControllerState>(
  (set) => ({
    selectedReportTab: ReportTabValues.NEW_REPORT,
    setSelectedReportTab: (tab) => set({ selectedReportTab: tab }),
  })
);
