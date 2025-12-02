import { create } from "zustand";

interface ReportListState {
  selectedReportId: number | null;
  setSelectedReportId: (id: number | null) => void;
  isReportListEmpty: boolean;
  setIsReportListEmpty: (isReportListEmpty: boolean) => void;
  selectedPatientId: number | null;
  setSelectedPatientId: (id: number | null) => void;
}

export const useReportListStore = create<ReportListState>((set) => ({
  selectedReportId: null,
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  isReportListEmpty: false,
  setIsReportListEmpty: (isReportListEmpty) =>
    set({ isReportListEmpty: isReportListEmpty }),
  selectedPatientId: null,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
}));
