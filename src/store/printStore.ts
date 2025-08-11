import { create } from "zustand";

interface PrintState {
  isPrintRequested: boolean;
  setPrintRequested: (requested: boolean) => void;
  clearPrintRequest: () => void;
}

export const usePrintStore = create<PrintState>((set) => ({
  isPrintRequested: false,
  setPrintRequested: (requested: boolean) =>
    set({ isPrintRequested: requested }),
  clearPrintRequest: () => set({ isPrintRequested: false }),
}));
