import { Sonography } from "@/lib/reportType";
import { checkFalsy } from "@/utils/common";

/**
 * Bridge 메시지에서 환자 ID를 안전하게 추출하는 함수
 */
function getPatientId(bridgeMessage: any): string {
  try {
    if (checkFalsy(bridgeMessage) || typeof bridgeMessage !== "object") {
      return "";
    }

    if (!("id" in bridgeMessage)) {
      return "";
    }

    const id = bridgeMessage.id;
    if (checkFalsy(id)) {
      return "";
    }

    const idString = id.toString();
    return idString === "undefined" ||
      idString === "null" ||
      idString.trim() === ""
      ? ""
      : idString;
  } catch (error) {
    console.warn("Error extracting patient ID:", error);
    return "";
  }
}

/**
 * Bridge 메시지에서 환자 ID가 유효한지 확인하는 함수
 */
function hasValidPatientId(bridgeMessage: any): boolean {
  try {
    if (checkFalsy(bridgeMessage) || typeof bridgeMessage !== "object") {
      return false;
    }

    if (!("id" in bridgeMessage)) {
      return false;
    }

    const id = bridgeMessage.id;
    if (checkFalsy(id)) {
      return false;
    }

    const idString = id.toString();
    return !(
      idString === "undefined" ||
      idString === "null" ||
      idString.trim() === ""
    );
  } catch (error) {
    console.warn("Error validating patient ID:", error);
    return false;
  }
}

/**
 * 생년월일 정보를 포맷팅하는 함수
 * 모든 값이 없으면 빈 문자열 반환
 * 일부 값만 있으면 없는 값은 -로 표시하고 /로 구분
 */
function formatBirthDate(
  birthYear?: string | number,
  birthMonth?: string | number,
  birthDay?: string | number
): string {
  // 1. 년/월/일을 배열로 만듦
  const parts = [birthYear, birthMonth, birthDay]
    // 2. 각 값을 문자열로 변환 (undefined는 "undefined"가 됨)
    .map((part) => {
      if (checkFalsy(part)) return null;
      const str = part.toString();
      return str === "undefined" || str === "null" || str.trim() === ""
        ? null
        : str;
    })
    // 3. 유효한 값은 그대로, 유효하지 않은 값은 "-"로 변환
    .map((part) => part || "-");

  // 4. 모든 값이 "-"이면 (즉, 모든 값이 유효하지 않으면) 빈 문자열 반환
  if (parts.every((part) => part === "-")) return "";

  // 5. 월과 일에 앞에 0 붙이기
  const formattedParts = [
    parts[0], // 년도는 그대로
    parts[1] !== "-" ? parts[1].padStart(2, "0") : "-", // 월에 0 붙이기
    parts[2] !== "-" ? parts[2].padStart(2, "0") : "-", // 일에 0 붙이기
  ];

  // 6. 유효한 값이 1개만 있으면 모든 위치를 표시 (예: "1990/-/-")
  if (formattedParts.filter((part) => part !== "-").length === 1) {
    return formattedParts.join("/"); // 모든 위치를 표시
  }

  // 7. 유효한 값이 2개 이상이면 모든 값을 "/"로 구분하여 반환
  return formattedParts.join("/");
}

/**
 * 포맷된 생년월일 문자열(YYYY/MM/DD 또는 YYYY/-/- 등)을 분리하여 객체로 반환
 * @param formattedBirthDate - formatBirthDate 함수의 결과물 (예: "1990/01/15", "1990/-/-", "")
 * @returns { birthYear: string, birthMonth: string, birthDay: string }
 */
function parseBirthDate(formattedBirthDate: string): {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
} {
  // 빈 문자열이면 모두 빈 문자열 반환
  if (!formattedBirthDate || formattedBirthDate.trim() === "") {
    return { birthYear: "", birthMonth: "", birthDay: "" };
  }

  // "/"로 분리
  const parts = formattedBirthDate.split("/");

  // 각 부분을 가져오고, "-"이면 빈 문자열로 변환
  const birthYear = parts[0] && parts[0] !== "-" ? parts[0] : "";
  const birthMonth = parts[1] && parts[1] !== "-" ? parts[1] : "";
  const birthDay = parts[2] && parts[2] !== "-" ? parts[2] : "";

  return {
    birthYear,
    birthMonth,
    birthDay,
  };
}

const getPatientType = (type: string) => {
  switch (type) {
    case "aesthetic":
      return "유방 확대";
    case "reconstructive":
      return "유방재건";
    case "both":
      return "유방확대 및 재건";
    default:
      return "";
  }
};

const getRuptureImageCount = (sonographies: Sonography[]) => {
  const breastImplantImages = sonographies.filter(
    (item: Sonography) => item.type === "BREAST_IMPLANT"
  );
  const ruptureImages = breastImplantImages.filter((item: Sonography) => {
    return item.analysis.labels.some(
      (label) =>
        label.result_type?.toLowerCase() === "rupture" &&
        label.result_class?.toLowerCase() === "positive"
    );
  });

  return ruptureImages.length;
};

const getAnalysisItemCount = (sonographies: Sonography[]) => {
  const breastImplantImages = sonographies.filter(
    (item: Sonography) => item.type === "BREAST_IMPLANT"
  );
  const lymphNodeImages = sonographies.filter(
    (item: Sonography) => item.type === "LYMPH_NODE"
  );
  const ruptureImages = breastImplantImages.filter((item: Sonography) => {
    return item.analysis.labels.some(
      (label) =>
        label.result_type?.toLowerCase() === "rupture" &&
        label.result_class?.toLowerCase() === "positive"
    );
  });

  return {
    totalAnalysisImageCount: sonographies.length,
    ruptureImageCount: ruptureImages.length,
    breastImplantImageCount: breastImplantImages.length,
    lymphNodeImageCount: lymphNodeImages.length,
  };
};

const generateAnalysisItems = ({
  onlyRuptureExist,
  sonographies,
}: {
  onlyRuptureExist: boolean;
  sonographies: Sonography[];
}) => {
  let breastImplantLabels: Sonography[] = [];
  let lymphNodeLabels: Sonography[] = [];

  sonographies.forEach((item: Sonography) => {
    if (item.type === "BREAST_IMPLANT") {
      const breastImplantAnalysisLabels = item.analysis.labels.filter(
        (label) => label.result_type?.toLowerCase() === "rupture"
      );

      if (breastImplantAnalysisLabels.length > 0) {
        breastImplantLabels.push(item);
      }
    }

    if (item.type === "LYMPH_NODE") {
      const lymphNodeAnalysisLabels = item.analysis.labels.filter(
        (label) =>
          label.result_type?.toLowerCase() === "silicone_invasion_to_ln"
      );

      if (lymphNodeAnalysisLabels.length > 0) {
        lymphNodeLabels.push(item);
      }
    }
  });

  if (onlyRuptureExist) {
    return [
      ...breastImplantLabels.filter((item: Sonography) =>
        item.analysis.labels.some(
          (label) =>
            label.result_type?.toLowerCase() === "rupture" &&
            label.result_class?.toLowerCase() === "positive"
        )
      ),
      // TODO: 기획 회의 후 변경 가능성 있음.
      // ...lymphNodeLabels,
    ];
  } else {
    return [...breastImplantLabels, ...lymphNodeLabels];
  }
};

export {
  getPatientId,
  hasValidPatientId,
  formatBirthDate,
  parseBirthDate,
  getPatientType,
  getRuptureImageCount,
  getAnalysisItemCount,
  generateAnalysisItems,
};
