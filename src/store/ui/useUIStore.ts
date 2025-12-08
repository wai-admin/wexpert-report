import { create } from "zustand";

interface UIState {
  // 로딩 상태
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // 에러 상태
  error: Error | null;
  setError: (error: Error | null) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;

  // 재시도 함수
  refetchFn: (() => void) | null;
  setRefetchFn: (fn: (() => void) | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 로딩 상태
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  // 에러 상태
  error: null,
  setError: (error: Error | null) => set({ error }),
  isError: false,
  setIsError: (isError: boolean) => set({ isError }),

  // 재시도 함수
  refetchFn: null,
  setRefetchFn: (fn: (() => void) | null) => set({ refetchFn: fn }),
}));

// 기존 export 유지 (하위 호환성)
export const useLoadingStore = useUIStore;
export const useErrorStore = useUIStore;
