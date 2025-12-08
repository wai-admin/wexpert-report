import { create } from "zustand";
import { ImageExportOptionValues } from "@/types";

interface ReportState {
  // 리포트 리스트 관련
  selectedReportId: number | null;
  setSelectedReportId: (id: number | null) => void;
  selectedPatientId: number | null;
  setSelectedPatientId: (id: number | null) => void;
  isReportListEmpty: boolean;
  setIsReportListEmpty: (isReportListEmpty: boolean) => void;

  // 새 리포트 관련
  imageExportOption: ImageExportOptionValues;
  setImageExportOption: (option: ImageExportOptionValues) => void;
  physicianAssessment: string;
  setPhysicianAssessment: (assessment: string) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  // 리포트 리스트 관련
  selectedReportId: null,
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  selectedPatientId: null,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  isReportListEmpty: false,
  setIsReportListEmpty: (isReportListEmpty) =>
    set({ isReportListEmpty: isReportListEmpty }),

  // 새 리포트 관련
  imageExportOption: ImageExportOptionValues.ALL_IMAGE,
  physicianAssessment: "",
  setImageExportOption: (option: ImageExportOptionValues) => {
    set({ imageExportOption: option });
  },
  setPhysicianAssessment: (assessment: string) => {
    set({ physicianAssessment: assessment });
  },
}));

// 기존 export 유지 (하위 호환성)
export const useReportListStore = useReportStore;
export const useNewReportStore = useReportStore;
