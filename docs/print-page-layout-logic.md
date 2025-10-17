# 프린트 페이지 레이아웃 생성 로직

## 개요

이 문서는 A4 프린트 페이지를 동적으로 생성하는 로직에 대해 설명합니다. 각 컴포넌트의 높이를 측정하여 현재 페이지에 배치할지, 다음 페이지에 배치할지를 결정하는 알고리즘을 다룹니다.

---

## 핵심 개념

### 1. A4 페이지 크기 계산

```typescript
// src/constants/print-config.ts
const CONTENTS_MAX_HEIGHT = 1027; // px 단위
```

**계산 방식:**

- A4 세로 길이: 297mm
- px 변환: 297mm × 3.7795275591px/mm = 1122.54px
- 상하 padding + 헤더: 60px + 35px = 95px
- **실제 콘텐츠 영역: 1122.54px - 95px ≈ 1027px**

> ⚠️ **주의**: 프린트 화면의 높이를 조정할 때는 이 값도 함께 수정해야 합니다.

---

## 아키텍처

### 전체 흐름도

```
reportData 수신
    ↓
useA4Handler 실행
    ↓
getA4Element() - 렌더링할 요소 목록 생성
    ↓
getA4Data() - 높이 측정 및 페이지 분배
    ↓
elementPageInfo 생성
    ↓
PrintPage에서 페이지별 렌더링
```

---

## 주요 컴포넌트 및 로직

### 1. useA4Handler Hook

**위치**: `src/hooks/useA4Handler.tsx`

**역할**:

- 컴포넌트 높이 측정
- 페이지 분배 로직 실행
- 페이지 정보(`elementPageInfo`) 생성

#### 1.1 상태 관리

```typescript
const measureRootRef = useRef<HTMLDivElement>(null);
const [elementPageInfo, setElementPageInfo] = useState<ElementPageInfo[]>([]);
```

- `measureRootRef`: 화면 밖에서 높이를 측정하기 위한 숨겨진 컨테이너
- `elementPageInfo`: 각 페이지에 배치될 요소 목록

```typescript
interface ElementPageInfo {
  page: number; // 페이지 번호
  elements: string[]; // 해당 페이지에 포함될 요소 ID 배열
}
```

#### 1.2 MeasureContainer 컴포넌트

```typescript
MeasureContainer: () => (
  <div
    ref={measureRootRef}
    style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
  />
);
```

**특징:**

- 화면 밖(`-9999px`)에 배치되어 사용자에게 보이지 않음
- 실제 DOM에 렌더링되어 정확한 높이 측정 가능
- 각 요소를 순차적으로 주입하여 누적 높이 계산

---

### 2. getA4Element() - 요소 목록 생성

**목적**: 렌더링할 모든 요소를 정의하고 순서를 결정합니다.

```typescript
const getA4Element = (
  reportData: ReportResponse,
  nativeMessage: NativeDefaultMessage | null
) => {
  // 파열 항목 필터링
  const ruptureItems = reportData.data.patientDetail.sonographies.filter(
    (item: Sonography) =>
      item.analysis.labels.some((label) => label.result_type === "rupture")
  );

  // Positive case만 필터링 (옵션)
  const positiveCaseItems = ruptureItems.filter((item: Sonography) =>
    item.analysis.labels.some((label) => label.result_class === "exist")
  );

  // 내보내기 옵션에 따른 분기
  const analysisItems =
    nativeMessage?.exportOptionType === ExportOptionType.ONLY_POSITIVE_CASE
      ? positiveCaseItems
      : ruptureItems;

  return [
    // 1. 환자 정보
    {
      type: ELEMENT.PATIENT_INFORMATION,
      data: patientInformation(ELEMENT.PATIENT_INFORMATION),
      active: true,
    },
    // 2. AI 분석 요약
    {
      type: ELEMENT.ANALYSIS_SUMMARY,
      data: analysisSummary(ELEMENT.ANALYSIS_SUMMARY),
      active: true,
    },
    // 3. 추천 치료
    {
      type: ELEMENT.RECOMMEND_TREATMENT,
      data: recommendTreatment(
        ELEMENT.RECOMMEND_TREATMENT,
        reportData.data.recommendedTreatment
      ),
      active: true,
    },
    // 4. 분석 뷰어
    {
      type: ELEMENT.ANALYSIS_VIEWER,
      data: analysisViewer(ELEMENT.ANALYSIS_VIEWER),
      active: true,
    },
    // 5. 분석 결과 (동적 생성)
    ...(analysisItems?.map((_, index) => ({
      type: ELEMENT.ANALYSIS_RESULT(index),
      data: analysisResult(ELEMENT.ANALYSIS_RESULT(index)),
      active: true,
    })) || []),
    // 6. 담당 의사 소견 (버전별 활성화)
    {
      type: ELEMENT.ASSESSMENT,
      data: assessment(ELEMENT.ASSESSMENT, nativeMessage?.assessment || ""),
      active: getFeatureActivation(
        FEATURE.ASSESSMENT,
        nativeMessage?.nativeVersion as NATIVE_VERSION | undefined
      ),
    },
  ];
};
```

**반환 구조:**

```typescript
{
  type: string,      // 요소 식별자 (예: "patient-information")
  data: string,      // HTML 문자열
  active: boolean    // 활성화 여부
}[]
```

---

### 3. getA4Data() - 높이 측정 및 페이지 분배

**핵심 알고리즘**: 이 함수가 프린트 레이아웃의 핵심입니다.

```typescript
const getA4Data = (
  a4Element: { type: string; data: string; active: boolean | undefined }[]
) => {
  const pages: ElementPageInfo[] = [];
  let currentPage = 1;
  let currentPageData: string[] = [];

  a4Element.forEach((element) => {
    // 1. 비활성화된 요소는 건너뛰기
    if (element.active === false) {
      return;
    }

    if (measureRootRef.current) {
      // 2. 현재 요소를 측정 컨테이너에 추가
      measureRootRef.current.innerHTML += element.data;

      // 3. 누적된 높이 측정
      const elementHeight = measureRootRef.current.offsetHeight;

      // 4. A4 최대 높이 초과 체크
      if (elementHeight > CONTENTS_MAX_HEIGHT) {
        // 5. 기존 페이지 저장
        if (currentPageData.length > 0) {
          pages.push({
            page: currentPage,
            elements: [...currentPageData],
          });
        }

        // 6. 새 페이지 시작
        currentPage++;
        currentPageData = [element.type];
        measureRootRef.current.innerHTML = element.data;
      } else {
        // 7. 현재 페이지에 요소 추가
        currentPageData.push(element.type);
      }
    }
  });

  // 8. 마지막 페이지 저장
  if (currentPageData.length > 0) {
    pages.push({
      page: currentPage,
      elements: [...currentPageData],
    });
  }

  return pages;
};
```

#### 알고리즘 상세 설명

**Step 1: 비활성 요소 필터링**

```typescript
if (element.active === false) {
  return;
}
```

- `active: false`인 요소는 건너뜀 (예: 특정 버전에서 지원하지 않는 기능)

**Step 2-3: HTML 주입 및 높이 측정**

```typescript
measureRootRef.current.innerHTML += element.data;
const elementHeight = measureRootRef.current.offsetHeight;
```

- 기존 HTML에 새 요소 추가 (누적)
- `offsetHeight`로 실제 렌더링된 높이 측정

**Step 4-6: 높이 초과 처리**

```typescript
if (elementHeight > CONTENTS_MAX_HEIGHT) {
  // 현재 페이지 완료
  pages.push({
    page: currentPage,
    elements: [...currentPageData],
  });

  // 새 페이지 시작
  currentPage++;
  currentPageData = [element.type];
  measureRootRef.current.innerHTML = element.data;
}
```

- 누적 높이가 1027px 초과 시:
  1. 현재까지 모은 요소들을 페이지로 저장
  2. 페이지 번호 증가
  3. 초과한 요소를 새 페이지의 첫 요소로 설정
  4. 측정 컨테이너를 초기화하고 해당 요소만 주입

**Step 7: 현재 페이지에 추가**

```typescript
else {
  currentPageData.push(element.type);
}
```

- 높이가 괜찮으면 현재 페이지에 요소 추가

**Step 8: 마지막 페이지 저장**

```typescript
if (currentPageData.length > 0) {
  pages.push({
    page: currentPage,
    elements: [...currentPageData],
  });
}
```

- 루프 완료 후 남은 요소들을 마지막 페이지로 저장

---

## 실제 렌더링 과정

### 4. PrintPage 컴포넌트

**위치**: `src/pages/PrintPage.tsx`

```typescript
const PrintPage = () => {
  const { data: reportData } = useReport();

  // 페이지 정보 가져오기
  const { elementPageInfo, MeasureContainer } = useA4Handler();

  return (
    <div className="print-preview-container">
      {/* 1. 숨겨진 측정 컨테이너 */}
      <MeasureContainer />

      <div ref={printRef} className="a4-container">
        {/* 2. 커버 페이지 (독립적) */}
        <Cover hospitalName={hospitalName} />

        {/* 3. 페이지별 렌더링 */}
        {elementPageInfo.map((page) => {
          const { page: pageNumber, elements } = page;

          return (
            <A4Template key={`page-${pageNumber}`} pageNumber={pageNumber}>
              {/* 4. 요소별 렌더링 */}
              {elements.map((element) => (
                <ElementRenderer
                  key={element}
                  element={element}
                  reportData={reportData}
                />
              ))}
            </A4Template>
          );
        })}
      </div>
    </div>
  );
};
```

#### 렌더링 순서

1. **MeasureContainer**: 화면 밖에서 높이 측정용
2. **Cover**: 독립적인 표지 페이지
3. **elementPageInfo 기반 페이지 생성**:
   - 각 페이지마다 `A4Template` 래퍼
   - 페이지 내부에 해당 요소들 배치

---

### 5. ElementRenderer 컴포넌트

**위치**: `src/pages/ElementRenderer.tsx`

**역할**: 요소 ID에 따라 실제 React 컴포넌트를 렌더링합니다.

```typescript
const ElementRenderer = ({ element, reportData }: ElementRendererProps) => {
  const { nativeMessage } = useMessageStore();

  const {
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    analysisItems,
    analysisCount,
    ruptureCount,
    assessment,
  } = processReportData(reportData, nativeMessage);

  // 요소 타입별 분기
  if (element === ELEMENT.PATIENT_INFORMATION) {
    return (
      <PatientInformation
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        patientInformation={patientInformation}
      />
    );
  }

  if (element === ELEMENT.ANALYSIS_SUMMARY) {
    return (
      <AnalysisSummary
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        analysisSummary={analysisSummary}
      />
    );
  }

  // ... 다른 요소들

  if (element.includes(ELEMENT.ANALYSIS_RESULT_COMMON)) {
    // "analysis-result-0", "analysis-result-1" 등
    const analysisResultIndex = Number(element.split("-")[2]);
    const analysisItem = analysisItems[analysisResultIndex];

    return (
      <AnalysisResult index={analysisResultIndex + 1} item={analysisItem} />
    );
  }

  return <></>;
};
```

---

## HTML 템플릿 시스템

### 6. HTML 템플릿 함수

**위치**: `src/components/html/`

높이 측정 시 사용되는 HTML 문자열을 생성합니다.

#### 예시: patientInformation

```typescript
// src/components/html/patientInformation.ts
const patientInformation = (id: string) => `
  <div id="${id}" class="column">
    ${numberedList(1, "환자 정보")}
    <table>
      <tbody>
        <tr>
          <td class="td-label"></td>
          <td class="td-value"></td>
        </tr>
        <!-- ... -->
      </tbody>
    </table>
  </div>
`;
```

#### 예시: analysisResult

```typescript
// src/components/html/analysisResult.ts
const analysisResult = (id: string) => `
  <div id="${id}" class="analysis-container" style="margin-top: 14px">
    <div class="analysis-img" style="border: 1px solid #f0f0f0"></div>
  </div>
`;
```

**특징:**

- 실제 컴포넌트와 동일한 CSS 클래스 사용
- 높이 측정에 영향을 주는 스타일 포함
- 내용은 비어있어도 구조는 동일

---

## 예시 시나리오

### 시나리오 1: 3개의 분석 결과

**입력 데이터:**

- 환자 정보
- AI 분석 요약
- 추천 치료
- 분석 뷰어
- 분석 결과 × 3
- 담당 의사 소견

**실행 과정:**

```
측정 시작
├─ 환자 정보 추가 → 높이: 200px (OK, 페이지 1에 추가)
├─ AI 분석 요약 추가 → 높이: 450px (OK, 페이지 1에 추가)
├─ 추천 치료 추가 → 높이: 650px (OK, 페이지 1에 추가)
├─ 분석 뷰어 추가 → 높이: 850px (OK, 페이지 1에 추가)
├─ 분석 결과 0 추가 → 높이: 1100px (초과! 페이지 2로)
│   └─ 페이지 1 저장: [환자정보, 분석요약, 추천치료, 분석뷰어]
│   └─ 페이지 2 시작: [분석결과0]
├─ 분석 결과 1 추가 → 높이: 550px (OK, 페이지 2에 추가)
├─ 분석 결과 2 추가 → 높이: 800px (OK, 페이지 2에 추가)
└─ 담당 의사 소견 추가 → 높이: 1050px (초과! 페이지 3으로)
    └─ 페이지 2 저장: [분석결과0, 분석결과1, 분석결과2]
    └─ 페이지 3 시작: [담당의사소견]

최종 결과: 3페이지
```

**생성된 elementPageInfo:**

```typescript
[
  {
    page: 1,
    elements: [
      "patient-information",
      "analysis-summary",
      "recommend-treatment",
      "analysis-viewer",
    ],
  },
  {
    page: 2,
    elements: ["analysis-result-0", "analysis-result-1", "analysis-result-2"],
  },
  {
    page: 3,
    elements: ["assessment"],
  },
];
```

---

## 요소 타입 정의

**위치**: `src/constants/element.ts`

```typescript
const ELEMENT = {
  A4_CONTAINER: "a4-container",
  PATIENT_INFORMATION: "patient-information",
  ANALYSIS_SUMMARY: "analysis-summary",
  RECOMMEND_TREATMENT: "recommend-treatment",
  ANALYSIS_VIEWER: "analysis-viewer",
  ANALYSIS_RESULT_COMMON: "analysis-result",
  ANALYSIS_RESULT: (index: number) => `analysis-result-${index}`,
  ASSESSMENT: "assessment",
};
```

**특징:**

- 정적 요소: 고정 문자열
- 동적 요소: 함수로 인덱스 기반 ID 생성

---

## 요약

### 핵심 프로세스

1. **데이터 수신**: API에서 리포트 데이터 가져오기
2. **요소 생성**: `getA4Element()`로 렌더링할 요소 목록 생성
3. **높이 측정**: `getA4Data()`에서 화면 밖 컨테이너에 요소를 순차 주입
4. **페이지 분배**: 누적 높이가 1027px 초과 시 새 페이지 생성
5. **렌더링**: `elementPageInfo`를 기반으로 실제 컴포넌트 렌더링

### 주요 장점

- ✅ **동적 레이아웃**: 콘텐츠 양에 따라 자동으로 페이지 수 조절
- ✅ **정확한 측정**: 실제 DOM 렌더링으로 정확한 높이 계산
- ✅ **유지보수 용이**: 요소 추가/제거가 간단
- ✅ **인쇄 최적화**: A4 크기에 맞춰 자동 분할

### 주의사항

- ⚠️ `CONTENTS_MAX_HEIGHT` 값은 CSS와 동기화 필요
- ⚠️ HTML 템플릿은 실제 컴포넌트 구조와 일치해야 함
- ⚠️ 이미지 등 비동기 로딩 요소는 크기 고정 필요
- ⚠️ 요소 단위로만 페이지 분할 가능 (중간 분할 불가)

---

## 관련 파일

- `src/hooks/useA4Handler.tsx` - 메인 로직
- `src/pages/PrintPage.tsx` - 페이지 렌더링
- `src/pages/ElementRenderer.tsx` - 요소별 컴포넌트 매핑
- `src/constants/print-config.ts` - 높이 상수
- `src/constants/element.ts` - 요소 타입 정의
- `src/components/html/*.ts` - HTML 템플릿
- `src/components/templates/A4Template.tsx` - 페이지 템플릿
