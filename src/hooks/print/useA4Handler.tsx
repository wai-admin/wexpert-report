import { useEffect, useRef, useState } from "react";
import {
  patientInformation,
  analysisSummary,
  recommendTreatment,
  analysisViewer,
  analysisResult,
  assessment,
} from "@/components/html";
import { ELEMENT, CONTENTS_MAX_HEIGHT } from "@/constants";
import { generateAnalysisItems } from "@/utils";
import { ImageExportOptionValues, PrintData } from "@/types";

interface ElementPageInfo {
  page: number;
  elements: string[];
}

interface UseA4HandlerProps {
  printData: PrintData | null;
}

const useA4Handler = ({ printData }: UseA4HandlerProps) => {
  const measureRootRef = useRef<HTMLDivElement>(null);
  const [elementPageInfo, setElementPageInfo] = useState<ElementPageInfo[]>([]);

  // 데이터 초기화, 변경 시 페이지 생성 (A4 내부에 표시할 요소 목록 생성)
  useEffect(() => {
    if (printData) {
      // 1. elementPageInfo 초기화
      setElementPageInfo([]);

      // 2. measureRootRef 초기화
      if (measureRootRef.current) {
        measureRootRef.current.innerHTML = "";
      }

      // 3. 새로운 데이터로 페이지 생성
      const a4Element = getA4Element(printData);
      const generatedPages = getA4Data(a4Element);
      setElementPageInfo(generatedPages);
    }
  }, [printData]);

  // A4 내부에 표시할 요소 목록 생성
  const getA4Element = (printData: PrintData) => {
    const analysisItems = generateAnalysisItems({
      onlyRuptureExist:
        printData.analysisImage.itemOption.imageExportOption ===
        ImageExportOptionValues.RUPTURE_CASE,
      sonographies: printData.analysisImage.itemOption.sonographies,
    });

    return [
      {
        type: ELEMENT.PATIENT_INFORMATION,
        data: patientInformation(ELEMENT.PATIENT_INFORMATION),
        active: true,
      },
      {
        type: ELEMENT.ANALYSIS_SUMMARY,
        data: analysisSummary(ELEMENT.ANALYSIS_SUMMARY),
        active: true,
      },
      {
        type: ELEMENT.RECOMMEND_TREATMENT,
        data: recommendTreatment(
          ELEMENT.RECOMMEND_TREATMENT,
          printData?.analysisResultByAI ?? ""
        ),
        active: true,
      },
      {
        type: ELEMENT.ANALYSIS_VIEWER,
        data: analysisViewer(ELEMENT.ANALYSIS_VIEWER),
        active: true,
      },
      // analysisItems 길이만큼 analysisResult 생성
      ...(analysisItems?.map((_, index) => ({
        type: ELEMENT.ANALYSIS_RESULT(index),
        data: analysisResult(ELEMENT.ANALYSIS_RESULT(index)),
        active: true,
      })) || []),
      {
        type: ELEMENT.ASSESSMENT,
        data: assessment(
          ELEMENT.ASSESSMENT,
          printData?.physicianAssessment ?? ""
        ),
        active: true,
      },
    ];
  };

  // 요소 목록을 기반으로 페이지 분배
  const getA4Data = (
    a4Element: { type: string; data: string; active: boolean | undefined }[]
  ) => {
    const pages: ElementPageInfo[] = [];
    let currentPage = 1;
    let currentPageData: string[] = [];

    a4Element.forEach((element) => {
      if (element.active === false) {
        return;
      }

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
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          // A4 콘텐츠 영역과 동일한 너비로 설정하여 정확한 높이 측정
          width: "var(--a4-content-width)",
        }}
      />
    ),
  };
};

export default useA4Handler;
