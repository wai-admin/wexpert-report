/**
 * 버전 문자열을 비교 가능한 숫자 배열로 변환
 * @example "1.2.3" => [1, 2, 3]
 */
export const parseVersion = (version: string): number[] => {
  return version.split(".").map((v) => parseInt(v, 10) || 0);
};

/**
 * 두 버전을 비교
 * @returns 1: v1 > v2, 0: v1 === v2, -1: v1 < v2
 */
export const compareVersions = (v1: string, v2: string): number => {
  const parts1 = parseVersion(v1);
  const parts2 = parseVersion(v2);
  const maxLength = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLength; i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
};

/**
 * 현재 버전이 최소 요구 버전 이상인지 확인
 * @param currentVersion 현재 버전
 * @param minVersion 최소 요구 버전
 * @returns true if currentVersion >= minVersion
 */
export const isVersionAtLeast = (
  currentVersion: string,
  minVersion: string
): boolean => {
  return compareVersions(currentVersion, minVersion) >= 0;
};

/**
 * 현재 버전이 특정 버전보다 낮은지 확인
 * @param currentVersion 현재 버전
 * @param maxVersion 최대 버전
 * @returns true if currentVersion < maxVersion
 */
export const isVersionBelow = (
  currentVersion: string,
  maxVersion: string
): boolean => {
  return compareVersions(currentVersion, maxVersion) < 0;
};

/**
 * 버전 범위 내에 있는지 확인
 * @param currentVersion 현재 버전
 * @param minVersion 최소 버전 (inclusive)
 * @param maxVersion 최대 버전 (exclusive)
 * @returns true if minVersion <= currentVersion < maxVersion
 */
export const isVersionInRange = (
  currentVersion: string,
  minVersion: string,
  maxVersion: string
): boolean => {
  return (
    isVersionAtLeast(currentVersion, minVersion) &&
    isVersionBelow(currentVersion, maxVersion)
  );
};

/**
 * 특정 버전과 정확히 일치하는지 확인
 */
export const isExactVersion = (
  currentVersion: string,
  targetVersion: string
): boolean => {
  return compareVersions(currentVersion, targetVersion) === 0;
};

