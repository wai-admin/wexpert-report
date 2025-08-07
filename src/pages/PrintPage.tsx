import { useState, useRef, useEffect } from "react";

import { Cover, FirstPage, RemainingPage } from "@/pages";
import { PrintButton } from "@/components";
import { analysisMockItems } from "@/constants/mock";
import { PRINT_CONFIG } from "@/constants/config";

const PrintPage = () => {
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("window", window);
    // ✅ 전역(window) 함수로 등록
    window.receiveNative = (param: any) => {
      console.log("C#에서 전달받은 메시지 [receiveNative]: ", param);
      setReceivedMessage(JSON.stringify(param));
    };

    function callNative() {
      // 문자열 형태로 전송
      window.chrome?.webview?.postMessage({
        type: "initialized",
      });

      // 객체 형태로도 전송 가능
      window.chrome?.webview?.postMessage({
        type: "progress",
        payload: true,
      });

      console.log("callNative");
    }

    callNative();

    return () => {
      delete window.receiveNative;
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
