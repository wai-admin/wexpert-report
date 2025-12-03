import { create } from "zustand";
import { ImageExportOptionValues, ReportTabValues } from "@/types";

interface ReportState {
  // Report List Selection (from useReportListStore)
  selectedReportId: number | null;
  setSelectedReportId: (id: number | null) => void;
  selectedPatientId: number | null;
  setSelectedPatientId: (id: number | null) => void;
  isReportListEmpty: boolean;
  setIsReportListEmpty: (isEmpty: boolean) => void;

  // Tab Selection (from usePatientControllerStore)
  selectedReportTab: ReportTabValues;
  setSelectedReportTab: (tab: ReportTabValues) => void;

  // New Report Input (from useNewReportStore)
  imageExportOption: ImageExportOptionValues;
  setImageExportOption: (option: ImageExportOptionValues) => void;
  physicianAssessment: string;
  setPhysicianAssessment: (assessment: string) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  // Report List Selection
  selectedReportId: null,
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  selectedPatientId: null,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  isReportListEmpty: false,
  setIsReportListEmpty: (isEmpty) => set({ isReportListEmpty: isEmpty }),

  // Tab Selection
  selectedReportTab: ReportTabValues.NEW_REPORT,
  setSelectedReportTab: (tab) => {
    set({ selectedReportTab: tab });
    // NEW_REPORT 탭으로 변경 시 reportList를 비어있지 않음으로 설정
    if (tab === ReportTabValues.NEW_REPORT) {
      set({ isReportListEmpty: false });
    }
  },

  // New Report Input
  imageExportOption: ImageExportOptionValues.ALL_IMAGE,
  setImageExportOption: (option) => set({ imageExportOption: option }),
  physicianAssessment: "",
  setPhysicianAssessment: (assessment) =>
    set({ physicianAssessment: assessment }),
}));
