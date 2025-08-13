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

export { formatAnalysisDate, formatPdfFileName };
