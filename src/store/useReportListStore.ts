import { create } from "zustand";

interface ReportListState {
  selectedReportId: number | null;
  setSelectedReportId: (id: number | null) => void;
  selectedPatientId: number | null;
  setSelectedPatientId: (id: number | null) => void;
  isReportListEmpty: boolean;
  setIsReportListEmpty: (isReportListEmpty: boolean) => void;
}

export const useReportListStore = create<ReportListState>((set) => ({
  selectedReportId: null,
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  selectedPatientId: null,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  isReportListEmpty: false,
  setIsReportListEmpty: (isReportListEmpty) =>
    set({ isReportListEmpty: isReportListEmpty }),
}));
