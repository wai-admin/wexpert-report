import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
}

// Zustand 스토어 생성 (persist 포함)
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearAccessToken: () => set({ accessToken: "" }),
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
      }), // user와 isAuthenticated만 저장
    }
  )
);

// 편의 함수들
const authUtils = {
  // 액세스 토큰 가져오기
  getAccessToken: () => useAuthStore.getState().accessToken,
  setAccessToken: (accessToken: string) =>
    useAuthStore.getState().setAccessToken(accessToken),
  clearAccessToken: () => useAuthStore.getState().clearAccessToken(),
};

export { useAuthStore, authUtils };
