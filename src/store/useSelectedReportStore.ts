import { create } from "zustand";

interface ReportHistoryState {
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
}

export const useReportHistoryStore = create<ReportHistoryState>((set) => ({
  selectedReportId: null,
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  selectedPatientId: null,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
}));
