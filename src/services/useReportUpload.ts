import { useMutation } from "@tanstack/react-query";
import { reportApi } from "@/services/api";
import { ReportUploadRequest, ReportUploadResponse, QUERY_KEYS } from "@/lib";
import { checkFalsy } from "@/utils/common";

/**
 * 리포트 업로드를 위한 커스텀 훅
 */
export const useReportUpload = () => {
  const mutation = useMutation<
    ReportUploadResponse,
    Error,
    ReportUploadRequest
  >({
    mutationKey: QUERY_KEYS.REPORT.UPLOAD(),
    mutationFn: async (data: ReportUploadRequest) => {
      // 입력 데이터 유효성 검사
      if (checkFalsy(data.report)) {
        throw new Error("Report data is required");
      }

      try {
        const response = await reportApi.uploadReport(data);
        return response;
      } catch (error) {
        console.error("Failed to upload report:", error);
        throw error;
      }
    },
    retry: (failureCount, error: any) => {
      // 네트워크 오류나 5xx 서버 오류는 재시도
      const isNetworkOrServerError =
        error.message.includes("Network") ||
        (error.response?.status && error.response.status >= 500);

      if (isNetworkOrServerError) {
        return failureCount < 2; // 최대 2번 재시도
      }

      // 4xx 클라이언트 오류는 재시도하지 않음
      return false;
    },
    // 1번째 재시도: 1초 딜레이, 2번째 재시도: 2초 딜레이
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    uploadReport: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset,
  };
};
