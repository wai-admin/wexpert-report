# 버전 관리 전략 (Version Management Strategy)

## 📋 개요

C# 네이티브 앱과 React 웹뷰 간의 Bridge 호환성을 관리하며, S3 버전별 배포를 지원합니다.

---

## 📜 관련 파일

### versions.json ⭐️⭐️⭐️⭐️⭐️

- Native App 버전 정보 명시.
- 해당 파일을 기준으로 S3 버킷에 버전 디렉터리가 생성됨.
- Native App 버전 수정 시 필수로 함께 변경되어야 하는 파일.

### loader.html

- index.html로 파일명이 치환되어 S3 버킷에 업로드됨.
- 브라우저에서 호스팅 시 처음으로 실행되는 파일.
- Bridge를 통해 Native 버전 정보를 수신하고 이를 기반으로 어떤 버전의 웹 프로젝트를 표시할지 결정하는 로직이 존재함.

### ci-develop / ci-stage / ci-prod

- versions.json의 정보를 기반으로 S3 버킷에 파일을 업로드 함.
- versions.json의 정보를 기반으로 loader.html의 버전 정보를 주입.

---

## 📊 버전 필드 설명

✅ 파일 참고: versions.json

### 1. `minimumAppVersion` (최신 범위 시작 버전)

현재 사용 중인 **버전 범위의 시작점**입니다.

- 이 버전부터 `currentAppVersion`까지는 **Bridge 변경 없음**
- 하위 호환성을 유지하는 버전 범위의 첫 번째 버전
- **S3에 배포되는 실제 폴더명**으로 사용됨

**예시**:

```json
"minimumAppVersion": "1.8.1.25336"
```

### 2. `currentAppVersion` (최신 범위 마지막 버전)

현재 사용 중인 **버전 범위의 끝점**입니다.

- `minimumAppVersion` ~ `currentAppVersion` 사이는 **동일한 코드** 사용 가능
- C# 네이티브 앱이 이 범위의 어떤 버전이어도 `minimumAppVersion`의 웹뷰로 동작

**예시**:

```json
"minimumAppVersion": "1.8.1.25336",
"currentAppVersion": "1.8.3.50000"
```

→ 의미: 1.8.1.25336 ~ 1.8.3.50000 동안 **Bridge 변경 없음**

### 3. `supportedAppVersions` (지원 버전 목록)

과거에 사용했던 **주요 버전들의 목록**입니다.

- Bridge에 **Breaking Change**가 있었던 버전들
- 각 버전은 S3에 별도 폴더로 배포됨
- 배열의 순서 상관 없음

**예시**:

```json
"supportedAppVersions": [
  "1.7.0.10000",
  "1.8.1.25336"
]
```

→ S3: `/versions/1.7.0.10000/`, `/versions/1.8.1.25336/`

---

## 🔄 버전 업데이트 시나리오

### 시나리오 1: Bridge 변경 없는 업데이트

**상황**: 1.8.1에서 1.8.2로 업데이트, Bridge 변경 없음

**Before**:

```json
{
  "minimumAppVersion": "1.8.1.25336",
  "currentAppVersion": "1.8.1.25336",
  "supportedAppVersions": []
}
```

**After**:

```json
{
  "minimumAppVersion": "1.8.1.25336",
  "currentAppVersion": "1.8.2.30000",     ← 변경
  "supportedAppVersions": []             ← 변경 없음
}
```

**결과**:

- ✅ 새 배포 없음 (S3에 1.8.1.25336만 유지)
- ✅ 1.8.1.xxxxx ~ 1.8.2.xxxxx 모두 `/versions/1.8.1.25336/` 사용

---

### 시나리오 2: Bridge 변경이 있는 업데이트 (Breaking Change)

**상황**: 1.8.3에서 1.8.4로 업데이트, **Bridge API 변경**

**Before**:

```json
{
  "minimumAppVersion": "1.8.1.25336",
  "currentAppVersion": "1.8.3.50000",
  "supportedAppVersions": []
}
```

**After**:

```json
{
  "minimumAppVersion": "1.8.4.60000",     ← 새 버전으로 변경
  "currentAppVersion": "1.8.4.60000",       ← 새 버전으로 변경
  "supportedAppVersions": [
    "1.8.1.25336"                     ← 기존 minimumAppVersion 추가
  ]
}
```

**결과**:

- ✅ S3에 `/versions/1.8.4.60000/` 새로 배포
- ✅ `/versions/1.8.1.25336/` 유지 (하위 호환)
- ✅ 1.8.1 ~ 1.8.3 사용자: `/versions/1.8.1.25336/`
- ✅ 1.8.4 이상 사용자: `/versions/1.8.4.60000/`

---

### 시나리오 3: 여러 Breaking Change

**상황**: 시간이 지나면서 여러 번의 Breaking Change 발생

**버전 히스토리**:

```json
{
  "minimumAppVersion": "1.9.0.80000",
  "currentAppVersion": "1.9.2.85000",
  "supportedAppVersions": [
    "1.7.0.10000",    ← 첫 버전
    "1.8.1.25336",    ← 두 번째 Breaking Change
    "1.8.4.60000"     ← 세 번째 Breaking Change
  ]
}
```

**S3 구조**:

```
s3://bucket/versions/
├── 1.7.0.10000/    ← 1.7.0 ~ 1.8.0 사용자
├── 1.8.1.25336/    ← 1.8.1 ~ 1.8.3 사용자
├── 1.8.4.60000/    ← 1.8.4 ~ 1.8.9 사용자
└── 1.9.0.80000/    ← 1.9.0 ~ 1.9.2 사용자 (최신)
```

**버전 매칭**:

- C# Native: `1.8.2.40000` → 가장 가까운 `1.8.1.25336` 사용
- C# Native: `1.8.5.70000` → 가장 가까운 `1.8.4.60000` 사용
- C# Native: `1.9.1.82000` → 가장 가까운 `1.9.0.80000` 사용

---

## 🎯 버전 매칭 로직 (상세)

### 기본 설정

```json
{
  "minimumAppVersion": "1.9.0.80000",
  "currentAppVersion": "1.9.2.85000",
  "supportedAppVersions": ["1.7.0.10000", "1.8.1.25336", "1.8.4.60000"]
}
```

### 시나리오 1: nativeVersion < minimumAppVersion

**조건**: nativeVersion이 `minimumAppVersion`보다 **낮은** 경우

**예시**: nativeVersion = `1.7.2.53455`

**로직**:

1. minimumAppVersion(1.9.0.80000) ~ currentAppVersion(1.9.2.85000) 범위 체크 → ❌ 범위 밖
2. nativeVersion < minimumAppVersion → ✅ 과거 버전
3. `supportedAppVersions`에서 **가장 가까우면서 낮은** 버전 찾기
4. 후보: `1.7.0.10000` ✅

**결과**: `/versions/1.7.0.10000/` 로 호스팅

**숫자 비교**:

```
1.7.0.10000 → 17010000 (목표보다 낮음, 차이: 36243455)
1.7.2.53455 → 17253455 (목표)
1.8.1.25336 → 18125336 (목표보다 높음, 제외)
1.8.4.60000 → 18460000 (목표보다 높음, 제외)
→ 선택: 1.7.0.10000 ✅
```

### 시나리오 2: minimumAppVersion ≤ nativeVersion ≤ currentAppVersion

**조건**: nativeVersion이 현재 활성 **범위 내**인 경우

**예시**: nativeVersion = `1.9.1.82000`

**로직**:

1. minimumAppVersion(1.9.0.80000) ~ currentAppVersion(1.9.2.85000) 범위 체크 → ✅ 범위 내
2. `minimumAppVersion` 반환

**결과**: `/versions/1.9.0.80000/` 로 호스팅

**이유**:

- 1.9.0 ~ 1.9.2 동안 Bridge 변경 없음
- 모두 동일한 웹뷰 코드 사용

### 시나리오 3: nativeVersion > currentAppVersion

**조건**: nativeVersion이 `currentAppVersion`보다 **높은** 경우 (미래 버전)

**예시**: nativeVersion = `1.9.4.00000`

**로직**:

1. minimumAppVersion(1.9.0.80000) ~ currentAppVersion(1.9.2.85000) 범위 체크 → ❌ 범위 밖
2. nativeVersion > currentAppVersion → ✅ 미래 버전
3. `minimumAppVersion` 반환 (최신 코드 사용)

**결과**: `/versions/1.9.0.80000/` 로 호스팅

**이유**:

- 아직 배포되지 않은 미래 버전
- 현재 최신 코드로 동작 (forward compatibility)

---

## 📊 전체 매칭 테이블

| nativeVersion | 범위                                       | 매칭 로직                                      | 결과 버전   |
| ------------- | ------------------------------------------ | ---------------------------------------------- | ----------- |
| 1.6.5.00000   | < min app version                          | supportedAppVersions에서 가장 가까운 낮은 버전 | 1.7.0.10000 |
| 1.7.0.10000   | < min app version                          | 정확히 일치                                    | 1.7.0.10000 |
| 1.7.2.53455   | < min app version                          | supportedAppVersions에서 가장 가까운 낮은 버전 | 1.7.0.10000 |
| 1.8.0.20000   | < min app version                          | supportedAppVersions에서 가장 가까운 낮은 버전 | 1.8.1.25336 |
| 1.8.2.40000   | < min app version                          | supportedAppVersions에서 가장 가까운 낮은 버전 | 1.8.1.25336 |
| 1.8.5.70000   | < min app version                          | supportedAppVersions에서 가장 가까운 낮은 버전 | 1.8.4.60000 |
| 1.9.0.80000   | = min app version                          | minimumAppVersion 사용                         | 1.9.0.80000 |
| 1.9.1.82000   | min app version ~ current app version 사이 | minimumAppVersion 사용                         | 1.9.0.80000 |
| 1.9.2.85000   | = current app version                      | minimumAppVersion 사용                         | 1.9.0.80000 |
| 1.9.4.00000   | > current app version                      | minimumAppVersion 사용 (미래 버전)             | 1.9.0.80000 |
| 2.0.0.00000   | > current app version                      | minimumAppVersion 사용 (미래 버전)             | 1.9.0.80000 |

---

## 🎯 개발자 워크플로우

### 1. **일반 업데이트 (Bridge 변경 없음)**

```bash
# 1. 버전만 업데이트
# config/versions.json
{
  "currentAppVersion": "1.8.2.30000"  ← 변경
}

```

### 2. **Breaking Change 업데이트**

```bash
# 1. 버전 업데이트 및 supportedAppVersions 추가
# config/versions.json
{
  "minimumAppVersion": "1.8.4.60000",    ← 새 버전
  "currentAppVersion": "1.8.4.60000",      ← 새 버전
  "supportedAppVersions": [
    "1.8.1.25336"                     ← 기존 추가
  ]
}

```

---

## 🔍 버전 범위 해석

### 예시 1

```json
{
  "minimumAppVersion": "1.8.1.25336",
  "currentAppVersion": "1.8.1.25336",
  "supportedAppVersions": []
}
```

**의미**:

- 현재 버전만 지원
- Breaking Change 없음

### 예시 2

```json
{
  "minimumAppVersion": "1.8.1.25336",
  "currentAppVersion": "1.8.3.50000",
  "supportedAppVersions": []
}
```

**의미**:

- 1.8.1.25336 ~ 1.8.3.50000 동안 **변경 없음**
- 모두 동일한 웹뷰 코드 사용

### 예시 3

```json
{
  "minimumAppVersion": "1.8.4.60000",
  "currentAppVersion": "1.8.5.70000",
  "supportedAppVersions": ["1.8.1.25336"]
}
```

**의미**:

- 1.8.1 ~ 1.8.3: `/versions/1.8.1.25336/` 사용
- 1.8.4 ~ 1.8.5: `/versions/1.8.4.60000/` 사용 (새 버전)

---

## 📌 중요 원칙

### ✅ DO

- `currentAppVersion`은 항상 `minimumAppVersion` 이상이어야 함
- Breaking Change 시 기존 `minimumAppVersion`을 `supportedAppVersions`에 추가
- 버전은 시간 순서대로 증가

### ❌ DON'T

- `currentAppVersion` < `minimumAppVersion` (논리적 오류)
- Breaking Change 없이 `supportedAppVersions` 추가
- 배포 없이 `minimumAppVersion` 변경

---

## 📖 용어 정리

| 용어                   | 의미                  | 예시                  |
| ---------------------- | --------------------- | --------------------- |
| `minimumAppVersion`    | 현재 활성 범위의 시작 | 1.8.1.25336           |
| `currentAppVersion`    | 현재 활성 범위의 끝   | 1.8.3.50000           |
| `supportedAppVersions` | 과거 주요 버전들      | ["1.7.0", "1.8.1"]    |
| Breaking Change        | Bridge API 변경       | postMessage 구조 변경 |
| 하위 호환성            | 이전 버전 지원        | 1.8.1 사용자도 작동   |

---

## 🔗 관련 파일

- `config/versions.json`: 버전 정의
- `.github/workflows/ci-{branch}.yml`: 배포 자동화
- `templates/loader.html`: 버전 매칭 로직
- `src/constants/bridge.ts`: React 앱 버전 상수

---

## 📝 변경 이력 예시

```
# 첫 배포
minimumAppVersion: 1.8.1.25336
currentAppVersion: 1.8.1.25336
supportedAppVersions: []

# 1.8.2 릴리스 (Bridge 변경 없음)
minimumAppVersion: 1.8.1.25336  (유지)
currentAppVersion: 1.8.2.30000    (갱신)
supportedAppVersions: []

# 1.8.3 릴리스 (Bridge 변경 없음)
minimumAppVersion: 1.8.1.25336  (유지)
currentAppVersion: 1.8.3.50000    (갱신)
supportedAppVersions: []

# 1.8.4 릴리스 (Bridge 변경 있음 - Breaking Change!)
minimumAppVersion: 1.8.4.60000  (새 버전)
currentAppVersion: 1.8.4.60000    (새 버전)
supportedAppVersions: [
  "1.8.1.25336"              (기존 minimumAppVersion 추가)
]

# 1.8.5 릴리스 (Bridge 변경 없음)
minimumAppVersion: 1.8.4.60000  (유지)
currentAppVersion: 1.8.5.70000    (갱신)
supportedAppVersions: [
  "1.8.1.25336"              (유지)
]

# 1.9.0 릴리스 (Bridge 변경 있음 - Breaking Change!)
minimumAppVersion: "1.9.0.80000"  (새 버전)
currentAppVersion: "1.9.0.80000"    (새 버전)
supportedAppVersions: [
  "1.8.1.25336",               (유지)
  "1.8.4.60000"                (기존 minimumAppVersion 추가)
]
```

---

## 💡 실전 예시

### 상황: 6개월 동안의 버전 히스토리

```json
{
  "minimumAppVersion": "1.9.0.80000",
  "currentAppVersion": "1.9.2.85000",
  "supportedAppVersions": [
    "1.7.0.10000", // 2024-06: 첫 배포
    "1.8.1.25336", // 2024-09: Bridge v2 (Breaking Change)
    "1.8.4.60000" // 2024-11: Bridge v3 (Breaking Change)
  ]
}
```

### 버전별 매칭

| C# Native Version | 매칭되는 웹뷰 버전 | 이유               |
| ----------------- | ------------------ | ------------------ |
| 1.7.0.15000       | 1.7.0.10000        | 정확히 일치        |
| 1.7.5.20000       | 1.7.0.10000        | 가장 가까운 버전   |
| 1.8.1.25336       | 1.8.1.25336        | 정확히 일치        |
| 1.8.2.40000       | 1.8.1.25336        | 1.8.1 ~ 1.8.3 범위 |
| 1.8.3.50000       | 1.8.1.25336        | 1.8.1 ~ 1.8.3 범위 |
| 1.8.4.60000       | 1.8.4.60000        | 정확히 일치        |
| 1.8.5.70000       | 1.8.4.60000        | 1.8.4 ~ 1.8.5 범위 |
| 1.9.0.80000       | 1.9.0.80000        | 정확히 일치        |
| 1.9.1.82000       | 1.9.0.80000        | 1.9.0 ~ 1.9.2 범위 |

---

## 🔗 추가 정보

### S3 배포 구조

```
s3://wexpert-report-dev/
├── index.html                    (Loader)
└── versions/
    ├── {minimumAppVersion}/         (현재 활성 버전)
    └── {supportedAppVersions[]}/   (과거 버전들)
```

### Loader 매칭 로직

1. `AVAILABLE_VERSIONS` = `supportedAppVersions` + `minimumAppVersion`
2. C# Native Version과 정확히 일치하는 버전 찾기
3. 없으면 숫자로 변환하여 가장 가까운 버전 선택
4. 해당 버전의 웹뷰로 리다이렉트

**마지막 업데이트**: 2025-12-18
