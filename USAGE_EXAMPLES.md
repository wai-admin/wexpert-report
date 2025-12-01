# Native Version 관리 사용 가이드

이 문서는 `nativeVersion`에 따라 다른 버전의 UI/로직을 렌더링하는 방법을 설명합니다.

## 📋 목차

1. [개요](#개요)
2. [사용 방법](#사용-방법)
3. [예제 코드](#예제-코드)
4. [베스트 프랙티스](#베스트-프랙티스)

---

## 개요

C# WebView2로부터 받은 `nativeVersion` 정보를 기반으로 버전별로 다른 컴포넌트와 로직을 렌더링할 수 있습니다.

### 주요 구성 요소

- **`useVersionStore`**: 버전 정보를 전역으로 관리하는 Zustand 스토어
- **`useVersion`**: 버전 비교 유틸리티를 제공하는 React Hook
- **`VersionGuard`**: 버전 조건부 렌더링 컴포넌트
- **버전 유틸리티 함수**: `compareVersions`, `isVersionAtLeast` 등

---

## 사용 방법

### 1. Hook을 사용한 조건부 렌더링

```tsx
import { useVersion } from "@/hooks";

const MyComponent = () => {
  const { nativeVersion, isAtLeast, isBelow, isInRange } = useVersion();

  // 버전 2.0.0 이상에서만 새 기능 표시
  if (isAtLeast("2.0.0")) {
    return <NewFeatureComponent />;
  }

  // 레거시 버전용 UI
  return <LegacyComponent />;
};
```

### 2. VersionGuard 컴포넌트 사용

```tsx
import { VersionGuard } from "@/components-common";

const App = () => {
  return (
    <>
      {/* 2.0.0 이상에서만 표시 */}
      <VersionGuard minVersion="2.0.0">
        <NewReportUI />
      </VersionGuard>

      {/* 2.0.0 미만에서만 표시 */}
      <VersionGuard maxVersion="2.0.0">
        <LegacyReportUI />
      </VersionGuard>

      {/* 2.0.0 이상 3.0.0 미만에서만 표시 */}
      <VersionGuard minVersion="2.0.0" maxVersion="3.0.0">
        <SpecificVersionFeature />
      </VersionGuard>

      {/* 조건 불만족 시 fallback 표시 */}
      <VersionGuard minVersion="2.0.0" fallback={<OldFeature />}>
        <NewFeature />
      </VersionGuard>
    </>
  );
};
```

### 3. 버전 상수 활용

```tsx
import { VERSION_FEATURES } from "@/constants";
import { useVersion } from "@/hooks";

const AnalysisViewer = () => {
  const { isAtLeast } = useVersion();

  return (
    <div>
      {isAtLeast(VERSION_FEATURES.ENHANCED_ANALYSIS_VIEWER) ? (
        <EnhancedAnalysisViewer />
      ) : (
        <BasicAnalysisViewer />
      )}
    </div>
  );
};
```

---

## 예제 코드

### 예제 1: 버전별 다른 컴포넌트 렌더링

```tsx
import { useVersion } from "@/hooks";

const ReportPage = () => {
  const { isAtLeast } = useVersion();

  return (
    <div>
      <h1>Report</h1>
      
      {/* 버전 2.0.0 이상: 새로운 디자인 */}
      {isAtLeast("2.0.0") && <NewReportDesign />}
      
      {/* 버전 2.0.0 미만: 기존 디자인 */}
      {!isAtLeast("2.0.0") && <OldReportDesign />}
    </div>
  );
};
```

### 예제 2: 버전 범위에 따른 조건부 기능

```tsx
import { useVersion } from "@/hooks";

const ExportButton = () => {
  const { isInRange, isAtLeast } = useVersion();

  const handleExport = () => {
    // 버전 2.2.0 이상: 개선된 PDF 내보내기
    if (isAtLeast("2.2.0")) {
      exportWithNewEngine();
    } 
    // 버전 2.0.0 ~ 2.2.0: 기본 PDF 내보내기
    else if (isInRange("2.0.0", "2.2.0")) {
      exportWithBasicEngine();
    }
    // 그 외: 레거시 내보내기
    else {
      exportLegacy();
    }
  };

  return <button onClick={handleExport}>Export PDF</button>;
};
```

### 예제 3: VersionGuard를 사용한 선언적 렌더링

```tsx
import { VersionGuard } from "@/components-common";
import { VERSION_FEATURES } from "@/constants";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* 다중 언어 지원 버전에서만 언어 전환 버튼 표시 */}
      <VersionGuard minVersion={VERSION_FEATURES.MULTI_LANGUAGE}>
        <LanguageSwitcher />
      </VersionGuard>

      {/* 새 리포트 UI 지원 여부에 따라 다른 버튼 표시 */}
      <VersionGuard 
        minVersion={VERSION_FEATURES.NEW_REPORT_UI}
        fallback={<OldCreateButton />}
      >
        <NewCreateButton />
      </VersionGuard>

      <ReportList />
    </div>
  );
};
```

### 예제 4: 여러 버전 조건 조합

```tsx
import { useVersion } from "@/hooks";

const FeatureFlag = () => {
  const { isAtLeast, isExact, compare } = useVersion();

  // 복잡한 버전 로직
  const showBetaFeature = isAtLeast("2.1.0") && !isAtLeast("3.0.0");
  const showHotfix = isExact("2.1.5"); // 정확히 2.1.5 버전만
  const isNewerThan = (version: string) => compare(version) > 0;

  return (
    <div>
      {showBetaFeature && <BetaFeature />}
      {showHotfix && <div>⚠️ 긴급 수정 사항이 적용되었습니다.</div>}
      {isNewerThan("1.5.0") && <ModernFeature />}
    </div>
  );
};
```

### 예제 5: 버전 정보 디버깅

```tsx
import { useVersion } from "@/hooks";

const VersionDebugger = () => {
  const { nativeVersion, isAtLeast } = useVersion();

  return (
    <div style={{ padding: "10px", background: "#f0f0f0" }}>
      <h3>Version Info</h3>
      <p>Current Native Version: <strong>{nativeVersion}</strong></p>
      <ul>
        <li>Supports v2.0+: {isAtLeast("2.0.0") ? "✅" : "❌"}</li>
        <li>Supports v2.1+: {isAtLeast("2.1.0") ? "✅" : "❌"}</li>
        <li>Supports v2.2+: {isAtLeast("2.2.0") ? "✅" : "❌"}</li>
      </ul>
    </div>
  );
};
```

---

## 베스트 프랙티스

### ✅ 권장사항

1. **버전 상수 사용**: 하드코딩된 버전 문자열 대신 `constants/version.ts`에 정의된 상수를 사용하세요.

```tsx
// ❌ 나쁜 예
if (isAtLeast("2.0.0")) { ... }

// ✅ 좋은 예
import { VERSION_FEATURES } from "@/constants";
if (isAtLeast(VERSION_FEATURES.NEW_REPORT_UI)) { ... }
```

2. **선언적 렌더링**: 간단한 조건부 렌더링은 `VersionGuard` 컴포넌트를 사용하세요.

```tsx
// ✅ 좋은 예 - 선언적이고 읽기 쉬움
<VersionGuard minVersion="2.0.0">
  <NewFeature />
</VersionGuard>

// ⚠️ 복잡한 로직이 필요한 경우에만 useVersion 훅 사용
```

3. **Fallback 제공**: 구버전 사용자를 위한 대체 UI를 항상 제공하세요.

```tsx
<VersionGuard minVersion="2.0.0" fallback={<LegacyUI />}>
  <ModernUI />
</VersionGuard>
```

4. **시맨틱 버저닝**: 버전은 `major.minor.patch` 형식을 따르세요.
   - `1.0.0`, `2.1.5` ✅
   - `v1.0`, `1.0` ⚠️ (동작하지만 권장하지 않음)

### ❌ 피해야 할 패턴

1. **문자열 비교**: 버전을 직접 문자열로 비교하지 마세요.

```tsx
// ❌ 나쁜 예
if (nativeVersion === "2.0.0") { ... }

// ✅ 좋은 예
if (isExact("2.0.0")) { ... }
```

2. **중복된 버전 체크**: 버전 체크를 여러 곳에서 반복하지 마세요.

```tsx
// ❌ 나쁜 예
const Component1 = () => {
  const { isAtLeast } = useVersion();
  return isAtLeast("2.0.0") ? <New /> : <Old />;
};

const Component2 = () => {
  const { isAtLeast } = useVersion();
  return isAtLeast("2.0.0") ? <New /> : <Old />;
};

// ✅ 좋은 예 - 상위 컴포넌트에서 한 번만 체크
const Parent = () => {
  const { isAtLeast } = useVersion();
  const useNewVersion = isAtLeast("2.0.0");
  
  return (
    <>
      <Component1 useNewVersion={useNewVersion} />
      <Component2 useNewVersion={useNewVersion} />
    </>
  );
};
```

---

## 버전 히스토리 관리

`constants/version.ts` 파일에 새로운 기능과 버전을 추가하세요:

```typescript
export const VERSION_FEATURES = {
  NEW_FEATURE_NAME: "x.y.z",
  // 새 기능 추가 시 여기에 추가
} as const;
```

이렇게 하면 타입 안정성과 코드 재사용성이 향상됩니다.

