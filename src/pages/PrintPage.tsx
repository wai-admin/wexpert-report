import { useRef } from "react";
import { Cover, FirstPage, RemainingPage } from "@/pages";
import { PrintButton } from "@/components";
import { analysisMockItems } from "@/constants/mock";
import { PRINT_CONFIG } from "@/constants/config";
import { useMessageStore } from "@/store/messageStore";
import { useQuery } from "@/hooks/useQuery";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";

const PrintPage = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const { nativeMessage } = useMessageStore();
  const { data: reportData } = useQuery({
    queryKey: QUERY_KEYS.REPORT.DETAIL(
      nativeMessage && "id" in nativeMessage
        ? (nativeMessage as any).id?.toString() || ""
        : ""
    ),
    queryFn: () =>
      reportApi.getReport(
        nativeMessage && "id" in nativeMessage
          ? (nativeMessage as any).id?.toString() || ""
          : ""
      ),
    enabled: !!(
      nativeMessage &&
      "id" in nativeMessage &&
      (nativeMessage as any).id
    ), // patientId가 있을 때만 실행
  });

  console.log("PrintPage nativeMessage: ", nativeMessage);
  console.log("PrintPage reportData: ", reportData);

  // 첫 페이지에 표시될 아이템들 (최대 2개)
  const firstPageItems = analysisMockItems.slice(
    0,
    PRINT_CONFIG.FIRST_PAGE_ITEMS
  );
  // 첫 페이지 이후의 아이템들
  const remainingItems = analysisMockItems.slice(PRINT_CONFIG.FIRST_PAGE_ITEMS);

  return (
    <div className="print-preview-container">
      <PrintButton printRef={printRef} />
      <div ref={printRef} className="a4-container">
        <Cover />
        <FirstPage analysisItems={firstPageItems} />
        <RemainingPage
          firstPageItems={firstPageItems}
          analysisItems={remainingItems}
        />
      </div>
    </div>
  );
};

export default PrintPage;
