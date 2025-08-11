// Falsy 타입 정의
export type Falsy = false | 0 | "" | null | undefined;

export interface FormDataItem {
  type: "json" | "file";
  key: string;
  content: Record<string, string | number> | File;
}

// 인자 값이 truthy 한지 판단하는 함수
function checkTruthy<T>(value: T): value is Exclude<T, Falsy> {
  return Boolean(value);
}

// 인자 값이 falsy 한지 판단하는 함수
function checkFalsy<T>(value: T): value is Exclude<T, Exclude<T, Falsy>> {
  return checkTruthy(value) === false;
}

// 빈 객체인지 판단하는 함수
function checkEmptyObject<T extends object>(param: T): boolean {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

// 빈 배열인지 판단하는 함수
function checkEmptyArray<T>(param: T[]): boolean {
  return param.length === 0;
}

function checkEnvironment(env: "development" | "production") {
  return import.meta.env.DEV === (env === "development");
}

const checkDev = () => {
  return import.meta.env.DEV;
};

const checkProd = () => {
  return import.meta.env.PROD;
};

/**
 * JSON 객체에서 특정 키가 존재하는지 확인하는 함수
 * @param obj 확인할 객체
 * @param key 찾을 키
 * @returns 키가 존재하면 true, 없으면 false
 */
function hasKey(obj: any, key: string): boolean {
  return key in obj;
}

/**
 * Native 메시지에서 환자 ID를 안전하게 추출하는 함수
 */
function getPatientId(nativeMessage: any): string {
  try {
    if (checkFalsy(nativeMessage) || typeof nativeMessage !== "object") {
      return "";
    }

    if (!("id" in nativeMessage)) {
      return "";
    }

    const id = nativeMessage.id;
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
 * Native 메시지에서 환자 ID가 유효한지 확인하는 함수
 */
function hasValidPatientId(nativeMessage: any): boolean {
  try {
    if (checkFalsy(nativeMessage) || typeof nativeMessage !== "object") {
      return false;
    }

    if (!("id" in nativeMessage)) {
      return false;
    }

    const id = nativeMessage.id;
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

  // 5. 유효한 값이 1개만 있으면 모든 위치를 표시 (예: "1990/-/-")
  if (parts.filter((part) => part !== "-").length === 1) {
    return parts.join("/"); // 모든 위치를 표시
  }

  // 6. 유효한 값이 2개 이상이면 모든 값을 "/"로 구분하여 반환
  return parts.join("/");
}

export {
  checkTruthy,
  checkFalsy,
  checkEmptyObject,
  checkEmptyArray,
  checkEnvironment,
  checkDev,
  checkProd,
  hasKey,
  getPatientId,
  hasValidPatientId,
  formatBirthDate,
};
