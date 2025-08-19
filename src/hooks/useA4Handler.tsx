import { useEffect, useRef, useState } from "react";
import {
  patientInformation,
  analysisSummary,
  recommendTreatment,
  analysisViewer,
  analysisResult,
  assessment,
} from "@/components/html";
import {
  ExportOptionType,
  NativeDefaultMessage,
  ReportResponse,
  Sonography,
} from "@/lib";
import { ELEMENT, CONTENTS_MAX_HEIGHT } from "@/constants";
import { useMessageStore } from "@/store";
import { useReport } from "@/services/useReport";

interface ElementPageInfo {
  page: number;
  elements: string[];
}

const useA4Handler = () => {
  const { data: reportData } = useReport();
  const { nativeMessage } = useMessageStore();

  const measureRootRef = useRef<HTMLDivElement>(null);
  const [elementPageInfo, setElementPageInfo] = useState<ElementPageInfo[]>([]);

  useEffect(() => {
    if (reportData) {
      // 1. elementPageInfo 초기화
      setElementPageInfo([]);

      // 2. measureRootRef 초기화
      if (measureRootRef.current) {
        measureRootRef.current.innerHTML = "";
      }

      // 3. 새로운 데이터로 페이지 생성
      const a4Element = getA4Element(reportData, nativeMessage);
      const generatedPages = getA4Data(a4Element);
      setElementPageInfo(generatedPages);
    }
  }, [reportData, nativeMessage]);

  const getA4Element = (
    reportData: ReportResponse,
    nativeMessage: NativeDefaultMessage | null
  ) => {
    // TODO: 필터링 로직 리팩토링 필요
    // analysis result 관련 필터링 <시작>
    const ruptureItems = reportData.data.patientDetail.sonographies.filter(
      (item: Sonography) =>
        item.analysis.labels.some((label) => label.result_type === "rupture")
    );

    const positiveCaseItems = ruptureItems.filter((item: Sonography) =>
      item.analysis.labels.some((label) => label.result_class === "exist")
    );

    const analysisItems =
      nativeMessage?.exportOptionType === ExportOptionType.ONLY_POSITIVE_CASE
        ? positiveCaseItems
        : ruptureItems;
    // analysis result 관련 필터링 <끝>

    return [
      {
        type: ELEMENT.PATIENT_INFORMATION,
        data: patientInformation(ELEMENT.PATIENT_INFORMATION),
      },
      {
        type: ELEMENT.ANALYSIS_SUMMARY,
        data: analysisSummary(ELEMENT.ANALYSIS_SUMMARY),
      },
      {
        type: ELEMENT.RECOMMEND_TREATMENT,
        data: recommendTreatment(
          ELEMENT.RECOMMEND_TREATMENT,
          reportData.data.recommendedTreatment
        ),
      },
      {
        type: ELEMENT.ANALYSIS_VIEWER,
        data: analysisViewer(ELEMENT.ANALYSIS_VIEWER),
      },
      // ruptureItems의 길이만큼 analysisResult 생성
      ...(analysisItems?.map((_, index) => ({
        type: ELEMENT.ANALYSIS_RESULT(index),
        data: analysisResult(ELEMENT.ANALYSIS_RESULT(index)),
      })) || []),
      {
        type: ELEMENT.ASSESSMENT,
        data: assessment(ELEMENT.ASSESSMENT, nativeMessage?.assessment || ""),
      },
    ];
  };

  const getA4Data = (a4Element: { type: string; data: string }[]) => {
    const pages: ElementPageInfo[] = [];
    let currentPage = 1;
    let currentPageData: string[] = [];

    a4Element.forEach((element) => {
      if (measureRootRef.current) {
        measureRootRef.current.innerHTML += element.data;
        const elementHeight = measureRootRef.current.offsetHeight;

        // element의 누적 높이가 A4 세로 길이를 초과했다면
        if (elementHeight > CONTENTS_MAX_HEIGHT) {
          // 기존의 페이지 정보를 저장
          if (currentPageData.length > 0) {
            pages.push({
              page: currentPage,
              elements: [...currentPageData],
            });
          }

          // 새로운 페이지 시작 및 요소 추가
          currentPage++;
          currentPageData = [element.type];
          measureRootRef.current.innerHTML = element.data;
        } else {
          // 현재 페이지에 요소 추가
          currentPageData.push(element.type);
        }
      }
    });

    // 위에서 각 요소를 처리하면서 높이 초과 시에만 페이지를 저장하기 때문에 마지막 페이지 정보를 추가
    if (currentPageData.length > 0) {
      pages.push({
        page: currentPage,
        elements: [...currentPageData],
      });
    }

    return pages;
  };

  return {
    elementPageInfo,
    MeasureContainer: () => (
      <div
        ref={measureRootRef}
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      />
    ),
  };
};

export default useA4Handler;
