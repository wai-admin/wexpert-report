import { useRef } from "react";
import { Cover, FirstPage, RemainingPage } from "@/pages";
import { PrintButton } from "@/components";
import { analysisMockItems } from "@/constants/mock";
import { PRINT_CONFIG } from "@/constants/config";
import { useMessageStore } from "@/store/messageStore";

const PrintPage = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const { receivedMessage } = useMessageStore();

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
      {receivedMessage && (
        <div>
          받은 메시지:{" "}
          {typeof receivedMessage === "string"
            ? receivedMessage
            : JSON.stringify(receivedMessage, null, 2)}
        </div>
      )}
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
