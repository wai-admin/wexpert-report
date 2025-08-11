import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";
import { sendPrintStatus } from "@/utils/bridge";
import { usePrintStore } from "@/store";

/**
 * 인쇄 처리를 위한 커스텀 훅
 */
export const usePrintHandler = (printRef: RefObject<HTMLDivElement | null>) => {
  const { clearPrintRequest } = usePrintStore();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Wexpert Report",
    onBeforePrint: async () => {
      // Native에게 인쇄 요청 메시지 전송
      sendPrintStatus(true);

      return Promise.resolve();
    },
    onAfterPrint: () => {
      // 인쇄 요청 상태 초기화 (상태 관리를 위해 별도로 초기화)
      clearPrintRequest();
      // Native에게 인쇄 완료 메시지 전송
      sendPrintStatus(false);
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0 0 0 0 !important;
      }
      body {
        margin: 0 0 0 0 !important;
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {
          margin: 0 0 0 0;
          padding: 0 0 0 0;
        }
      }
    `,
  });

  return { handlePrint };
};
