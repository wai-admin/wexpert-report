import { ReactNode } from "react";
import { useVersion } from "@/hooks/useVersion";

interface VersionGuardProps {
  children: ReactNode;
  /** 최소 요구 버전 (inclusive) */
  minVersion?: string;
  /** 최대 버전 (exclusive) */
  maxVersion?: string;
  /** 정확한 버전 매칭 */
  exactVersion?: string;
  /** 조건을 만족하지 않을 때 렌더링할 컴포넌트 */
  fallback?: ReactNode;
}

/**
 * 버전 조건에 따라 자식 컴포넌트를 조건부 렌더링하는 컴포넌트
 * 
 * @example
 * ```tsx
 * // 2.0.0 이상에서만 표시
 * <VersionGuard minVersion="2.0.0">
 *   <NewFeature />
 * </VersionGuard>
 * 
 * // 2.0.0 이상 3.0.0 미만에서만 표시
 * <VersionGuard minVersion="2.0.0" maxVersion="3.0.0">
 *   <SpecificVersionFeature />
 * </VersionGuard>
 * 
 * // 조건 불만족 시 fallback 표시
 * <VersionGuard minVersion="2.0.0" fallback={<LegacyComponent />}>
 *   <NewComponent />
 * </VersionGuard>
 * 
 * // 정확한 버전만 표시
 * <VersionGuard exactVersion="2.1.0">
 *   <VersionSpecificFix />
 * </VersionGuard>
 * ```
 */
export const VersionGuard = ({
  children,
  minVersion,
  maxVersion,
  exactVersion,
  fallback = null,
}: VersionGuardProps) => {
  const { isAtLeast, isBelow, isExact } = useVersion();

  // 정확한 버전 매칭이 우선
  if (exactVersion) {
    return isExact(exactVersion) ? <>{children}</> : <>{fallback}</>;
  }

  // 최소/최대 버전 범위 체크
  if (minVersion && !isAtLeast(minVersion)) {
    return <>{fallback}</>;
  }

  if (maxVersion && !isBelow(maxVersion)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

