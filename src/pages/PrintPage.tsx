import { useState, useRef, useEffect } from "react";

import { Cover, FirstPage, RemainingPage } from "@/pages";
import { PrintButton } from "@/components";
import { analysisMockItems } from "@/constants/mock";
import { PRINT_CONFIG } from "@/constants/config";

const PrintPage = () => {
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function callNative() {
      window.chrome?.webview?.postMessage("initialized");
      console.log("callNative");
    }

    function receiveNative(param: MessageEvent) {
      const message = JSON.stringify(param.data);
      setReceivedMessage(message);
      alert("receiveNative" + message);
      console.log("receiveNative", message);
    }

    window.addEventListener("message", receiveNative);

    callNative();

    return () => {
      window.removeEventListener("message", receiveNative);
    };
  }, []);

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
      {receivedMessage}
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
