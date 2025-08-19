import { useEffect, useRef } from "react";
import { ReportResponse } from "@/lib";

import { a4Template } from "@/components/html/templates/a4Template";
import { patientInformation } from "@/components/html/patientInformation";
import { analysisSummary } from "@/components/html/analysisSummary";
import { recommendTreatment } from "@/components/html/recommendTreatment";
import { analysisResult } from "@/components/html/analysisResult";
import { assessment } from "@/components/html/assessment";

interface UseA4HandlerProps {
  reportData: ReportResponse | undefined;
}

const useA4Handler = ({ reportData }: UseA4HandlerProps) => {
  const measureRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reportData && measureRootRef.current) {
      // if (measureRootRef.current) {
      const a4Element = getA4Element(reportData);

      getA4Data(reportData, a4Element);
    }
  }, [reportData]);

  const getA4Element = (reportData: ReportResponse | undefined) => {
    let a4Element = [];

    return [
      {
        type: "patientInformation",
        data: patientInformation,
      },
      {
        type: "analysisSummary",
        data: analysisSummary,
      },
      {
        type: "recommendTreatment",
        data: recommendTreatment(""),
      },
      // reportData?.data.patientDetail.sonographies.map((sonography) => {

      // },
      {
        type: "analysisResult",
        data: analysisResult,
      },
      {
        type: "assessment",
        data: assessment(""),
      },
    ];
  };

  const getA4Data = (
    reportData: ReportResponse | undefined,
    a4Element: { type: string; data: string }[]
  ) => {
    a4Element.forEach((element) => {
      if (measureRootRef.current) {
        measureRootRef.current.innerHTML += element.data;
        console.log(measureRootRef.current.offsetHeight);
      }
    });
  };

  let data = "";

  return {
    measureRootRef,
  };
};

export default useA4Handler;

// px기준
// 297mm * 3.7795275591px - 60px - 35px = 1027px
// A4 세로 길이를 px로 변환하고 상하 padding과 헤더 높이를 제외한 값
const CONTENTS_MAX_HEIGHT = 1027;
