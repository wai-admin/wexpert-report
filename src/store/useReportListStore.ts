import { create } from "zustand";

interface ReportListState {
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  isReportListEmpty: boolean;
  setIsReportListEmpty: (isReportListEmpty: boolean) => void;
}

export const useReportListStore = create<ReportListState>((set) => ({
  selectedReportId: null,
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  isReportListEmpty: false,
  setIsReportListEmpty: (isReportListEmpty) =>
    set({ isReportListEmpty: isReportListEmpty }),
}));
