import { useEffect, useRef, useState } from "react";
import { NativeDefaultMessage, ReportResponse, Sonography } from "@/lib";

import { patientInformation } from "@/components/html/patientInformation";
import { analysisSummary } from "@/components/html/analysisSummary";
import { recommendTreatment } from "@/components/html/recommendTreatment";
import { analysisResult } from "@/components/html/analysisResult";
import { assessment } from "@/components/html/assessment";

interface PageData {
  page: number;
  data: string[];
}

interface UseA4HandlerProps {
  reportData: ReportResponse | undefined;
  nativeMessage: NativeDefaultMessage | null;
}

const useA4Handler = ({ reportData, nativeMessage }: UseA4HandlerProps) => {
  const measureRootRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<PageData[]>([]);

  useEffect(() => {
    if (reportData && measureRootRef.current) {
      const a4Element = getA4Element(reportData, nativeMessage);
      const generatedPages = getA4Data(a4Element);
      setPages(generatedPages);
    }
  }, [reportData, nativeMessage]);

  const getA4Element = (
    reportData: ReportResponse,
    nativeMessage: NativeDefaultMessage | null
  ) => {
    const ruptureItems = reportData.data.patientDetail.sonographies.filter(
      (item: Sonography) =>
        item.analysis.labels.some((label) => label.result_type === "rupture")
    );

    return [
      {
        type: "patient-information",
        data: patientInformation,
      },
      {
        type: "analysis-summary",
        data: analysisSummary,
      },
      {
        type: "recommend-treatment",
        data: recommendTreatment(reportData.data.recommendedTreatment),
      },
      // ruptureItems의 길이만큼 analysisResult 생성
      ...(ruptureItems?.map((_, index) => ({
        type: `analysis-result-${index}`,
        data: analysisResult,
      })) || []),
      {
        type: "assessment",
        data: assessment(nativeMessage?.assessment || ""),
      },
    ];
  };

  const getA4Data = (a4Element: { type: string; data: string }[]) => {
    const pages: PageData[] = [];
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
              data: [...currentPageData],
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
        data: [...currentPageData],
      });
    }

    return pages;
  };

  return {
    measureRootRef,
    pages,
  };
};

export default useA4Handler;

// px기준
// 297mm * 3.7795275591px - 60px - 35px = 1027px
// A4 세로 길이를 px로 변환하고 상하 padding과 헤더 높이를 제외한 값
const CONTENTS_MAX_HEIGHT = 1027;
