import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import { sendPrintStatus, checkTruthy } from "@/utils";
import { useMessageStore, usePrintStore } from "@/store";
import { useReportUpload } from "@/services/useReportUpload";
import { ReportData, ExportOptionType } from "@/lib";

/**
 * 인쇄 처리를 위한 커스텀 훅
 */
export const usePrintHandler = (printRef: RefObject<HTMLDivElement | null>) => {
  const { clearPrintRequest } = usePrintStore();
  const { nativeMessage } = useMessageStore();
  const { uploadReport } = useReportUpload();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Wexpert Report",
    onBeforePrint: async () => {
      // Native에게 인쇄 요청 메시지 전송
      sendPrintStatus(true);

      // 리포트 업로드
      if (checkTruthy(nativeMessage)) {
        const reportData = {
          patientId: nativeMessage.id || null,
          includeAllImages:
            nativeMessage.exportOptionType === ExportOptionType.ALL,
          chartNumber: nativeMessage.chartNo || null,
          birthYear: nativeMessage.birthYear || null,
          birthMonth: nativeMessage.birthMonth || null,
          birthDay: nativeMessage.birthDay || null,
          doctorOpinion: nativeMessage.assessment || null,
        } as ReportData;

        console.log("Upload reportData: ", reportData);

        uploadReport({
          report: reportData,
          file: null,
        });
      }

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
