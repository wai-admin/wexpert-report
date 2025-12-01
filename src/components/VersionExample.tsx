/**
 * 버전 관리 시스템 사용 예제
 * 
 * 이 파일은 실제 프로젝트에서 사용할 수 있는 예제들을 보여줍니다.
 * 필요에 따라 이 패턴들을 프로젝트의 다른 컴포넌트에 적용하세요.
 */

import { useVersion } from "@/hooks";
import { VersionGuard } from "@/components-common";
import { VERSION_FEATURES } from "@/constants";

/**
 * 예제 1: useVersion 훅을 사용한 조건부 렌더링
 */
export const ReportUIExample = () => {
  const { isAtLeast } = useVersion();

  // 버전 2.0.0 이상에서는 새로운 UI, 미만에서는 레거시 UI
  if (isAtLeast(VERSION_FEATURES.NEW_REPORT_UI)) {
    return (
      <div className="new-report-ui">
        <h2>New Report Design (v2.0.0+)</h2>
        <p>향상된 사용자 경험과 새로운 기능</p>
        {/* 새로운 리포트 UI 컴포넌트들 */}
      </div>
    );
  }

  return (
    <div className="legacy-report-ui">
      <h2>Legacy Report Design</h2>
      <p>기존 리포트 디자인</p>
      {/* 기존 리포트 UI 컴포넌트들 */}
    </div>
  );
};

/**
 * 예제 2: VersionGuard 컴포넌트를 사용한 선언적 렌더링
 */
export const FeatureToggleExample = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* 다중 언어 지원이 있는 버전에서만 언어 전환 버튼 표시 */}
      <VersionGuard minVersion={VERSION_FEATURES.MULTI_LANGUAGE}>
        <div className="language-switcher">
          <button>한국어</button>
          <button>English</button>
        </div>
      </VersionGuard>

      {/* 새 리포트 UI 지원 여부에 따라 다른 버튼 표시 */}
      <VersionGuard
        minVersion={VERSION_FEATURES.NEW_REPORT_UI}
        fallback={
          <button className="legacy-create-btn">
            Create Report (Legacy)
          </button>
        }
      >
        <button className="modern-create-btn">
          ✨ Create New Report
        </button>
      </VersionGuard>

      {/* 향상된 분석 뷰어는 2.1.0 이상에서만 */}
      <VersionGuard minVersion={VERSION_FEATURES.ENHANCED_ANALYSIS_VIEWER}>
        <div className="enhanced-viewer">
          <p>🔍 향상된 분석 뷰어가 활성화되었습니다</p>
        </div>
      </VersionGuard>
    </div>
  );
};

/**
 * 예제 3: 버전 범위에 따른 조건부 로직
 */
export const ExportButtonExample = () => {
  const { isAtLeast, isInRange, nativeVersion } = useVersion();

  const handleExport = () => {
    // 버전별로 다른 내보내기 엔진 사용
    if (isAtLeast(VERSION_FEATURES.IMPROVED_PDF_EXPORT)) {
      console.log("Using improved PDF export engine (v2.2.0+)");
      // exportWithImprovedEngine();
    } else if (isInRange("2.0.0", "2.2.0")) {
      console.log("Using standard PDF export engine (v2.0.0 ~ v2.2.0)");
      // exportWithStandardEngine();
    } else {
      console.log("Using legacy PDF export (< v2.0.0)");
      // exportWithLegacyEngine();
    }
  };

  return (
    <div>
      <button onClick={handleExport}>
        Export PDF
      </button>
      <small>Current version: {nativeVersion}</small>
    </div>
  );
};

/**
 * 예제 4: 여러 버전 체크 조합
 */
export const ComplexVersionLogicExample = () => {
  const { isAtLeast, isBelow, isExact, compare } = useVersion();

  // 복잡한 버전 로직
  const showBetaFeature = isAtLeast("2.1.0") && isBelow("3.0.0");
  const showHotfix = isExact("2.1.5"); // 정확히 2.1.5 버전에만 표시
  const isModernVersion = compare("2.0.0") >= 0;

  return (
    <div>
      {showBetaFeature && (
        <div className="beta-badge">
          🚧 Beta Feature (v2.1.0 ~ v3.0.0)
        </div>
      )}

      {showHotfix && (
        <div className="hotfix-notice">
          ⚠️ 긴급 수정 사항이 적용되었습니다 (v2.1.5)
        </div>
      )}

      {isModernVersion && (
        <div className="modern-features">
          <h3>Modern Features Available</h3>
          <ul>
            <li>✅ 새로운 UI/UX</li>
            <li>✅ 향상된 성능</li>
            <li>✅ 추가 기능</li>
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * 예제 5: 버전 정보 디버깅 컴포넌트
 */
export const VersionDebugPanel = () => {
  const { nativeVersion, isAtLeast } = useVersion();

  return (
    <div style={{
      padding: "20px",
      background: "#f5f5f5",
      borderRadius: "8px",
      margin: "20px",
    }}>
      <h3>🔍 Version Debug Information</h3>
      <p>
        <strong>Current Native Version:</strong>{" "}
        <code>{nativeVersion || "Not initialized"}</code>
      </p>
      
      <h4>Feature Support:</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          {isAtLeast(VERSION_FEATURES.MULTI_LANGUAGE) ? "✅" : "❌"}
          {" "}Multi Language (v{VERSION_FEATURES.MULTI_LANGUAGE}+)
        </li>
        <li>
          {isAtLeast(VERSION_FEATURES.NEW_REPORT_UI) ? "✅" : "❌"}
          {" "}New Report UI (v{VERSION_FEATURES.NEW_REPORT_UI}+)
        </li>
        <li>
          {isAtLeast(VERSION_FEATURES.ENHANCED_ANALYSIS_VIEWER) ? "✅" : "❌"}
          {" "}Enhanced Analysis Viewer (v{VERSION_FEATURES.ENHANCED_ANALYSIS_VIEWER}+)
        </li>
        <li>
          {isAtLeast(VERSION_FEATURES.IMPROVED_PDF_EXPORT) ? "✅" : "❌"}
          {" "}Improved PDF Export (v{VERSION_FEATURES.IMPROVED_PDF_EXPORT}+)
        </li>
      </ul>
    </div>
  );
};

/**
 * 예제 6: 상위 컴포넌트에서 버전 체크 후 props로 전달
 * (불필요한 중복 체크 방지)
 */
interface ChildComponentProps {
  useNewDesign: boolean;
}

const ChildComponent1 = ({ useNewDesign }: ChildComponentProps) => {
  return (
    <div>
      {useNewDesign ? "New Design 1" : "Old Design 1"}
    </div>
  );
};

const ChildComponent2 = ({ useNewDesign }: ChildComponentProps) => {
  return (
    <div>
      {useNewDesign ? "New Design 2" : "Old Design 2"}
    </div>
  );
};

export const ParentWithVersionCheck = () => {
  const { isAtLeast } = useVersion();
  const useNewDesign = isAtLeast(VERSION_FEATURES.NEW_REPORT_UI);

  return (
    <div>
      <h2>Parent Component</h2>
      <ChildComponent1 useNewDesign={useNewDesign} />
      <ChildComponent2 useNewDesign={useNewDesign} />
    </div>
  );
};

