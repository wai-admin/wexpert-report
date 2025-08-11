import { useRef } from "react";
import { Cover, FirstPage, RemainingPage } from "@/pages";
import { PrintButton } from "@/components";
import { PRINT_CONFIG } from "@/constants/config";
import { useMessageStore } from "@/store/messageStore";
import { useQuery } from "@/hooks/useQuery";
import { reportApi } from "@/services/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { checkFalsy, checkTruthy } from "@/utils/common";
import { formatAnalysisDate } from "@/utils/date";
import { Sonography } from "@/lib/reportType";
import { useWebViewLoading } from "@/hooks/useWebViewLoading";

const PrintPage = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const { nativeMessage } = useMessageStore();
  const { data: reportData, isFetching } = useQuery({
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

  // const { data: reportData, isFetching } = useQuery({
  //   queryKey: QUERY_KEYS.REPORT.DETAIL("698"),
  //   queryFn: () => reportApi.getReport("698"),
  //   enabled: true, // patientId가 있을 때만 실행
  // });

  // WebView에 로딩 상태 전송
  useWebViewLoading(isFetching);

  console.log("PrintPage nativeMessage: ", nativeMessage);
  console.log("PrintPage reportData: ", reportData?.data);

  if (checkFalsy(reportData)) {
    return <></>;
  }

  const {
    patientSummary,
    analysisSummary,
    recommendedTreatment,
    patientDetail,
  } = reportData.data;

  // 병원 이름
  const hospitalName = patientSummary.hospitalName;
  // 환자 정보
  const patientInformation = {
    chatNumber: checkTruthy(nativeMessage) ? nativeMessage.chartNo : "",
    patientName: patientDetail.name,
    birth: checkTruthy(nativeMessage)
      ? `${nativeMessage.birthDay ?? "-"}/
        ${nativeMessage.birthMonth ?? "-"}/
        ${nativeMessage.birthYear ?? "-"}
        `
      : "",
    analysisDate: formatAnalysisDate(patientSummary.analysisDateTime),
  };
  // 파열 관련 모든 아이템들
  const ruptureAnalysisItems = patientDetail.sonographies.filter(
    (item: Sonography) =>
      item.analysis.labels.some((label) => label.result_type === "rupture")
  );
  // 파열 감지 결과가 없는 아이템들
  const positiveAnalysisItems = ruptureAnalysisItems.filter(
    (item: Sonography) =>
      item.analysis.labels.some(
        (label) =>
          label.result_type === "rupture" && label.result_class !== "exist"
      )
  );
  // 파열 관련 아이템들
  const analysisItems =
    nativeMessage?.exportOptionType === "only_positive_case"
      ? positiveAnalysisItems
      : ruptureAnalysisItems;
  // 전체 분석 결과 갯수
  const analysisCount = analysisItems.length;
  // 파열 감지 갯수
  const ruptureCount = analysisItems.filter((item: Sonography) =>
    item.analysis.labels.some(
      (label) =>
        label.result_type === "rupture" && label.result_class === "exist"
    )
  ).length;

  // 첫 페이지에 표시될 아이템들 (최대 2개)
  const firstPageItems = analysisItems.slice(0, PRINT_CONFIG.FIRST_PAGE_ITEMS);
  // 첫 페이지 이후의 아이템들
  const remainingItems = analysisItems.slice(PRINT_CONFIG.FIRST_PAGE_ITEMS);

  return (
    <div className="print-preview-container">
      <PrintButton printRef={printRef} />
      <div ref={printRef} className="a4-container">
        <Cover hospitalName={hospitalName} />
        <FirstPage
          patientInformation={patientInformation}
          analysisSummary={analysisSummary}
          recommendedTreatment={recommendedTreatment}
          analysisItems={firstPageItems}
          analysisCount={analysisCount}
          ruptureCount={ruptureCount}
        />
        <RemainingPage
          firstPageItems={firstPageItems}
          analysisItems={remainingItems}
        />
      </div>
    </div>
  );
};

export default PrintPage;
