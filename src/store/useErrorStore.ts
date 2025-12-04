import { create } from "zustand";

// 에러 상태
interface ErrorState {
  error: Error | null;
  setError: (error: Error | null) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  setError: (error: Error | null) => set({ error }),
  isError: false,
  setIsError: (isError: boolean) => set({ isError }),
}));
