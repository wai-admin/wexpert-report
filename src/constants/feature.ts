import { NATIVE_VERSION } from "./bridge";

// TODO: 네이티브 기능 추가 시 반드시 FEATURE enum 값 등록
enum FEATURE {
  CHARTNO = "chartNo",
  BIRTH = "birth",
  ASSESSMENT = "assessment",
  EXPORT_OPTION = "exportOption",
}

// TODO: 네이티브 버전 변경 시 반드시 FEATURE_ACTIVATION 값 등록
const FEATURE_ACTIVATION = [
  {
    FEATURE: FEATURE.CHARTNO,
    ACTIVATED: [NATIVE_VERSION.VERSION_0_10_3_25245],
  },
  {
    FEATURE: FEATURE.BIRTH,
    ACTIVATED: [NATIVE_VERSION.VERSION_0_10_3_25245],
  },
  {
    FEATURE: FEATURE.ASSESSMENT,
    ACTIVATED: [NATIVE_VERSION.VERSION_0_10_3_25245],
  },
] as const;

const getFeatureActivation = (
  feature: FEATURE,
  version: NATIVE_VERSION | undefined
) => {
  if (version === undefined) {
    return false;
  }

  // 버전 등록이 되지 않았을 경우, 최신 버전으로 간주하여 모두 활성화
  const isLatestVersion =
    Object.values(NATIVE_VERSION).includes(version) === false;

  if (isLatestVersion) {
    return true;
  }

  // 버전 등록된 경우, 해당 버전에서 활성화 여부 확인
  const selectedFeature = FEATURE_ACTIVATION.find(
    (featureActivation) => featureActivation.FEATURE === feature
  );
  const isActivated = selectedFeature?.ACTIVATED.includes(version);

  return isActivated;
};

export { FEATURE, FEATURE_ACTIVATION, getFeatureActivation };
