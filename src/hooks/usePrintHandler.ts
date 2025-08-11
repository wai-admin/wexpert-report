import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";
import { sendPrintStatus } from "@/utils/bridge";

/**
 * 인쇄 처리를 위한 커스텀 훅
 */
export const usePrintHandler = (printRef: RefObject<HTMLDivElement | null>) => {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Wexpert Report",
    onBeforePrint: async () => {
      sendPrintStatus(true);

      return Promise.resolve();
    },
    onAfterPrint: () => {
      sendPrintStatus(false);
    },
  });

  return { handlePrint };
};
