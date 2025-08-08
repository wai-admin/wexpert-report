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

// 모바일 환경인지 판단하는 함수
function checkMobile(): boolean {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
}

// 텍스트를 클립보드에 복사하는 함수
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

// 숫자에 콤마를 추가하는 함수
function addCommas(num: number): string {
  return num.toLocaleString();
}

/**
 * 디바운스 함수
 * @param func 실행할 함수
 * @param wait 대기 시간(ms)
 * @returns 디바운스된 함수
 */
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * 링크를 새 탭에서 열기
 * @param link 열 링크
 * blank: 새로운 탭에서 열도록 함
 * noopener: 새로운 탭에서 열린 페이지가 현재 페이지의 콘텍스트를 알 수 없도록 함
 * noreferrer: 새로운 탭에서 열린 페이지가 현재 페이지의 참조 정보를 전달하지 않도록 함
 */
function openLink(link: string) {
  window.open(link, "_blank", "noopener,noreferrer");
}

function checkEnvironment(env: "development" | "production") {
  return process.env.NODE_ENV === env;
}

/**
 * 이메일 유효성 검사 함수
 * ✅ user@domain.com
 * ✅ user.name@company.co.kr
 * ✅ user @ domain.com (공백 허용)
 * ❌ user@domain
 * ❌ user.domain.com
 * ❌ @domain.com
 * ❌ user@.com
 */
function validateEmail(email: string): boolean {
  // 공백 제거 후 검사
  const cleanEmail = email.replace(/\s/g, "");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleanEmail);
}

/**
 * 휴대폰번호 유효성 검사 함수
 * ✅ 010-1234-5678
 * ✅ +82-10-1234-5678
 * ✅ +1-555-123-4567
 * ✅ (02) 1234-5678
 * ✅ 010 1234 5678
 * ✅ +44 20 7946 0958
 * ✅ 010 - 1234 - 5678 (공백 허용)
 * ❌ abc-def-ghij
 * ❌ 010-123
 * ❌ 010-1234-567890123456
 * ❌ 010@1234#5678
 */
function validatePhone(phone: string): boolean {
  // 허용 문자: 숫자, +, -, (, ), 공백
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return false;
  }

  // 숫자만 추출
  const digitsOnly = phone.replace(/\D/g, "");

  // 최소 7자리, 최대 15자리 (국가 코드 포함)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return false;
  }

  return true;
}

// 첫 번째 글자만 대문자로 변환하는 함수
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getRequestFormData(dataArray: FormDataItem[]) {
  const formData = new FormData();

  dataArray.forEach((data) => {
    const { key, type, content } = data;

    if (type === "json") {
      const jsonDataBlob = new Blob([JSON.stringify(content)], {
        type: "application/json",
      });
      formData.append(key, jsonDataBlob);
    }

    if (type === "file") {
      formData.append(key, content as File, (content as File).name);
    }
  });

  return formData;
}

const checkDev = () => {
  return process.env.NODE_ENV === "development";
};

const checkProd = () => {
  return process.env.NODE_ENV === "production";
};

export {
  checkTruthy,
  checkFalsy,
  checkEmptyObject,
  checkEmptyArray,
  checkMobile,
  copyToClipboard,
  addCommas,
  debounce,
  checkEnvironment,
  openLink,
  validateEmail,
  validatePhone,
  capitalizeFirstLetter,
  getRequestFormData,
  checkDev,
  checkProd,
};
