import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { checkDev } from "@/utils/common";

interface QueryProviderProps {
  children: ReactNode;
}

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 쿼리 옵션 설정
      retry: 3, // 실패 시 재시도 횟수
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 재시도 지연 시간
      // staleTime: 5 * 60 * 1000, // 5분 - 데이터가 stale로 간주되는 시간
      // gcTime: 10 * 60 * 1000, // 10분 - 가비지 컬렉션 시간 (이전 cacheTime)
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
      refetchOnReconnect: true, // 네트워크 재연결 시 refetch 활성화
    },
    mutations: {
      // 기본 뮤테이션 옵션 설정
      retry: 1, // 뮤테이션 실패 시 재시도 횟수
    },
  },
});

const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 DevTools 표시 */}
      {checkDev() && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
};

export default QueryProvider;
