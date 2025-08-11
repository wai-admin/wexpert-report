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
