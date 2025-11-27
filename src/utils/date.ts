import { format } from "date-fns";
import { checkFalsy } from "@/utils/common";

const formatAnalysisDate = (date: string) => {
  // 빈 값이나 유효하지 않은 값 체크
  if (checkFalsy(date) || typeof date !== "string" || date.trim() === "") {
    return "";
  }

  try {
    const dateObj = new Date(date);
    // Invalid Date 체크
    if (isNaN(dateObj.getTime())) {
      return "";
    }
    return format(dateObj, "yyyy/MM/dd hh:mm a");
  } catch (error) {
    console.warn("Invalid date format:", date, error);
    return "";
  }
};

const formatPdfFileName = (date: Date) => {
  return format(date, "yyMMddHHmm");
};

/**
 * ISO 형식 문자열을 "항상 UTC 기준"으로 해석 후 로컬 타임으로 변환
 */
const parseAsUTC = (isoString: string): Date | string => {
  if (checkFalsy(isoString)) return "";

  // 1. "Z"나 오프셋(+00:00, +09:00 등)이 없으면 → UTC로 강제 인식시키기
  if (!isoString.match(/(Z|[+-]\d{2}:?\d{2})$/)) {
    isoString += "Z"; // 끝에 Z 추가해서 UTC로 해석
  }
  // 2. Date 객체로 변환 (Date는 내부적으로 UTC timestamp 저장)
  return new Date(isoString);
};

/**
 * UTC 기준 문자열을 로컬 시간 문자열로 변환
 */
const convertISOToLocal = (isoString: string, onlyDate?: boolean): string => {
  if (checkFalsy(isoString)) return "";

  const date = parseAsUTC(isoString);
  return format(date, onlyDate ? "yyyy/MM/dd" : "yyyy/MM/dd HH:mm:ss"); // 로컬 타임존 기준으로 포맷
};

export { formatAnalysisDate, formatPdfFileName, parseAsUTC, convertISOToLocal };
