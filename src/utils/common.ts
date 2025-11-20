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
 * 개행 문자를 정규화하는 함수
 * \r\n, \r, \n을 모두 \n으로 통일하여 일관된 줄바꿈 처리
 * @param text 정규화할 텍스트
 * @returns 정규화된 텍스트
 */
export const normalizeLineBreaks = (text: string): string => {
  if (!text) return "";

  return text
    .replace(/\r\n/g, "\n") // Windows 개행 (\r\n)을 \n으로
    .replace(/\r/g, "\n") // Mac 개행 (\r)을 \n으로
    .replace(/\n{3,}/g, "\n\n"); // 3개 이상 연속된 개행을 2개로 제한
};

/**
 * 텍스트의 개행 문자를 HTML <br> 태그로 변환하는 함수
 * @param text 변환할 텍스트
 * @returns HTML <br> 태그가 포함된 텍스트
 */
export const convertLineBreaksToHtml = (text: string): string => {
  if (!text) return "";

  const normalizedText = normalizeLineBreaks(text);
  return normalizedText.replace(/\n/g, "<br>");
};

export {
  checkTruthy,
  checkFalsy,
  checkEmptyObject,
  checkEmptyArray,
  checkEnvironment,
  checkDev,
  checkProd,
  hasKey,
};
