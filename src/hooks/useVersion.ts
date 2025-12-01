import { useMemo } from "react";
import { useVersionStore } from "@/store/useVersionStore";
import {
  isVersionAtLeast,
  isVersionBelow,
  isVersionInRange,
  isExactVersion,
  compareVersions,
} from "@/utils/version";

/**
 * 버전 관련 유틸리티를 제공하는 훅
 * 
 * @example
 * ```tsx
 * const { nativeVersion, isAtLeast, isBelow } = useVersion();
 * 
 * if (isAtLeast("2.0.0")) {
 *   return <NewFeatureComponent />;
 * }
 * 
 * return <LegacyComponent />;
 * ```
 */
export const useVersion = () => {
  const { nativeVersion } = useVersionStore();

  const versionHelpers = useMemo(
    () => ({
      /**
       * 현재 버전이 지정된 최소 버전 이상인지 확인
       * @example isAtLeast("2.0.0") // returns true if current >= 2.0.0
       */
      isAtLeast: (minVersion: string) =>
        isVersionAtLeast(nativeVersion, minVersion),

      /**
       * 현재 버전이 지정된 버전보다 낮은지 확인
       * @example isBelow("3.0.0") // returns true if current < 3.0.0
       */
      isBelow: (maxVersion: string) => isVersionBelow(nativeVersion, maxVersion),

      /**
       * 현재 버전이 범위 내에 있는지 확인
       * @example isInRange("2.0.0", "3.0.0") // true if 2.0.0 <= current < 3.0.0
       */
      isInRange: (minVersion: string, maxVersion: string) =>
        isVersionInRange(nativeVersion, minVersion, maxVersion),

      /**
       * 현재 버전이 정확히 일치하는지 확인
       * @example isExact("2.1.0") // returns true if current === 2.1.0
       */
      isExact: (targetVersion: string) =>
        isExactVersion(nativeVersion, targetVersion),

      /**
       * 다른 버전과 비교
       * @returns 1 if current > target, 0 if equal, -1 if current < target
       */
      compare: (targetVersion: string) =>
        compareVersions(nativeVersion, targetVersion),
    }),
    [nativeVersion]
  );

  return {
    nativeVersion,
    ...versionHelpers,
  };
};

