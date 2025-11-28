import { create } from "zustand";

interface SelectedReportState {
  selectedReportId: string | null;
  selectedPatientId: string | null;
  setSelectedReport: (
    reportId: string | null,
    patientId: string | null
  ) => void;
}

export const useSelectedReportStore = create<SelectedReportState>((set) => ({
  selectedReportId: null,
  selectedPatientId: null,
  setSelectedReport: (reportId, patientId) =>
    set({ selectedReportId: reportId, selectedPatientId: patientId }),
}));

// 기존 호환성을 위한 alias
export const useReportHistoryStore = useSelectedReportStore;
