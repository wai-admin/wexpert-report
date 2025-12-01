import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VersionState {
  nativeVersion: string;
  setNativeVersion: (version: string) => void;
  clearVersion: () => void;
}

/**
 * Native 앱 버전을 관리하는 Store
 * - nativeVersion: C# WebView2로부터 받은 네이티브 앱 버전
 */
const useVersionStore = create<VersionState>()(
  persist(
    (set) => ({
      nativeVersion: "",
      setNativeVersion: (version: string) => set({ nativeVersion: version }),
      clearVersion: () => set({ nativeVersion: "" }),
    }),
    {
      name: "version-storage",
      partialize: (state) => ({
        nativeVersion: state.nativeVersion,
      }),
    }
  )
);

// 편의 함수들
const versionUtils = {
  getNativeVersion: () => useVersionStore.getState().nativeVersion,
  setNativeVersion: (version: string) =>
    useVersionStore.getState().setNativeVersion(version),
  clearVersion: () => useVersionStore.getState().clearVersion(),
};

export { useVersionStore, versionUtils };

