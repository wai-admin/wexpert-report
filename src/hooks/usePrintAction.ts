import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import { sendPrintStatus, checkTruthy, formatPdfFileName } from "@/utils";
import { useMessageStore } from "@/store";
import { useReportUpload } from "@/services/useReportUpload";
import { ReportData } from "@/lib";
import { ImageExportOptionValues } from "@/types";

interface UsePrintActionProps {
  printRef: RefObject<HTMLDivElement | null>;
  imageExportOption: ImageExportOptionValues;
  physicianAssessment: string;
  patientName: string;
}

export interface PrintOptions {
  shouldUploadReport?: boolean;
}

/**
 * 인쇄 처리를 위한 커스텀 훅
 */
export const usePrintAction = ({
  printRef,
  imageExportOption,
  physicianAssessment,
  patientName,
}: UsePrintActionProps) => {
  const { nativeMessage } = useMessageStore();
  const { uploadReport } = useReportUpload();

  const fileName = `${patientName}_${formatPdfFileName(new Date())}`;

  // 현재 인쇄 옵션을 저장할 ref
  const printOptionsRef = { shouldUploadReport: true };

  const handlePrintInternal = useReactToPrint({
    contentRef: printRef,
    documentTitle: fileName,
    onBeforePrint: async () => {
      // Native에게 인쇄 요청 메시지 전송
      sendPrintStatus(true);

      console.log(
        "usePrintAction: handlePrintInternal: printOptionsRef",
        printOptionsRef
      );

      // 리포트 업로드 (옵션에 따라 분기)
      if (printOptionsRef.shouldUploadReport && checkTruthy(nativeMessage)) {
        const reportData = {
          patientId: nativeMessage.id || null,
          includeAllImages:
            imageExportOption === ImageExportOptionValues.ALL_IMAGE,
          doctorOpinion: physicianAssessment || null,
        } as ReportData;

        uploadReport({
          report: reportData,
          file: null,
        });
      }

      return Promise.resolve();
    },
    onAfterPrint: () => {
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

  // 옵션을 받을 수 있는 래퍼 함수
  const handlePrint = (options?: PrintOptions) => {
    printOptionsRef.shouldUploadReport = options?.shouldUploadReport ?? true;
    handlePrintInternal();
  };

  return { handlePrint };
};
