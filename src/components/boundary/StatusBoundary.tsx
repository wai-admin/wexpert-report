import { ReactNode } from "react";
import { useBridgeStore, useLoadingStore, useErrorStore } from "@/store";
import { LoadingIndicator, ErrorIndicator } from "@/components-common";
import { checkProd } from "@/utils";

/**
 * 로딩, 에러 UI 처리 바운더리
 */
const StatusBoundary = ({ children }: { children: ReactNode }) => {
  const { isInitializedBridgeMessage } = useBridgeStore();
  const { isLoading } = useLoadingStore();
  const { isError } = useErrorStore();

  // WARNING: 개발 환경과 프로덕션 환경의 동작이 차이가 있음.
  if (checkProd()) {
    // Bridge를 통해 Native에게 Message를 받기 전까지 로딩 표시
    if (!isInitializedBridgeMessage) {
      return (
        <div className="size-full flex items-center justify-center bg-bg-base-alt">
          <LoadingIndicator isLoading={true} full />
        </div>
      );
    }

    // API 호출 실패 시 에러 표시
    if (isError) {
      return (
        <>
          <ErrorIndicator />
          <LoadingIndicator isLoading={isLoading} full />
        </>
      );
    }
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} full />
      {children}
    </>
  );
};

export default StatusBoundary;
