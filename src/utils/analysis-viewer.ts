import { AnalysisLabel, SonographyAnalysis } from "@/lib/reportType";
import { Point } from "rulyotano.math.geometry";

interface GetImageCommentSummaryProps {
  totalAnalysisImageCount: number;
  ruptureImageCount: number;
  invasionToCapsuleExist: boolean;
  invasionToLymphNodeExist: boolean;
  i18n: any;
}

interface GetImageStatusProps {
  type: string;
  isRuptureExist: boolean;
  isInvasionToLymphNodeExist: boolean;
  i18n: any;
}

interface GetEachImageCommentProps {
  type: string;
  isRuptureExist: boolean;
  isInvasionToCapsuleExist: boolean;
  isInvasionToLymphNodeExist: boolean;
  i18n: any;
}

interface GetAnalysisResultProps {
  type: string;
  analysis: SonographyAnalysis;
}

interface GetAnalysisResultExistProps {
  analysis: SonographyAnalysis;
}

const getImageCommentSummary = (props: GetImageCommentSummaryProps) => {
  const {
    totalAnalysisImageCount,
    ruptureImageCount,
    invasionToCapsuleExist,
    invasionToLymphNodeExist,
    i18n,
  } = props;
  const hasRupture = ruptureImageCount > 0;

  // 파열 O, 실리콘 피막 침범 O, 림프절 침범 O
  if (hasRupture && invasionToLymphNodeExist && invasionToCapsuleExist) {
    return i18n(
      "complication-images-attached.rupture-comment-with-capsule-and-ln",
      {
        totalAnalysisImageCount,
        ruptureImageCount,
      }
    );
  }

  // 파열 O, 실리콘 피막 침범 X, 림프절 침범 O
  if (hasRupture && invasionToLymphNodeExist && !invasionToCapsuleExist) {
    return i18n("complication-images-attached.rupture-comment-with-ln", {
      totalAnalysisImageCount,
      ruptureImageCount,
    });
  }

  // 파열 O, 실리콘 피막 침범 O, 림프절 침범 X
  if (hasRupture && !invasionToLymphNodeExist && invasionToCapsuleExist) {
    return i18n("complication-images-attached.rupture-comment-with-capsule", {
      totalAnalysisImageCount,
      ruptureImageCount,
    });
  }

  // 파열 O, 실리콘 피막 침범 X, 림프절 침범 X
  if (hasRupture && !invasionToLymphNodeExist && !invasionToCapsuleExist) {
    return i18n("complication-images-attached.only-rupture-comment", {
      totalAnalysisImageCount,
      ruptureImageCount,
    });
  }

  // 파열 X
  if (!hasRupture) {
    return i18n("complication-images-attached.no-rupture-comment", {
      totalAnalysisImageCount,
    });
  }
};

const getEachImageComment = (props: GetEachImageCommentProps) => {
  const {
    type,
    isRuptureExist,
    isInvasionToCapsuleExist,
    isInvasionToLymphNodeExist,
    i18n,
  } = props;

  if (type === "BREAST_IMPLANT") {
    if (isRuptureExist) {
      if (isInvasionToCapsuleExist) {
        return (
          i18n("complication-images-attached.analysis-result-comment.rupture") +
          "\n" +
          i18n(
            "complication-images-attached.analysis-result-comment.invasion-to-capsule"
          )
        );
      } else {
        return i18n(
          "complication-images-attached.analysis-result-comment.rupture"
        );
      }
    } else {
      return i18n(
        "complication-images-attached.analysis-result-comment.normal"
      );
    }
  }

  if (type === "LYMPH_NODE") {
    if (isInvasionToLymphNodeExist) {
      return (
        i18n("complication-images-attached.analysis-result-comment.ln") +
        "\n" +
        i18n(
          "complication-images-attached.analysis-result-comment.invasion-to-ln"
        )
      );
    } else {
      return (
        i18n("complication-images-attached.analysis-result-comment.ln") +
        "\n" +
        i18n(
          "complication-images-attached.analysis-result-comment.no-invasion-to-ln"
        )
      );
    }
  }
};

// 이미지 상태 반환
const getImageStatus = (props: GetImageStatusProps) => {
  const { type, isRuptureExist, isInvasionToLymphNodeExist, i18n } = props;

  if (type === "BREAST_IMPLANT") {
    return isRuptureExist
      ? {
          text: i18n("complication-images-attached.image-status.rupture"),
          color: "red",
        }
      : {
          text: i18n("complication-images-attached.image-status.normal"),
          color: "black",
        };
  }

  if (type === "LYMPH_NODE") {
    return isInvasionToLymphNodeExist
      ? {
          text: i18n("complication-images-attached.image-status.ln-invasion"),
          color: "red",
        }
      : {
          text: i18n("complication-images-attached.image-status.normal"),
          color: "black",
        };
  }
};

const getAnalysisResult = (props: GetAnalysisResultProps) => {
  const { type, analysis } = props;
  if (type === "LYMPH_NODE") {
    return analysis.labels.find(
      (label) => label?.result_type === "silicone_invasion_to_ln"
    );
  } else if (type === "BREAST_IMPLANT") {
    return analysis.labels.find((label) => label?.result_type === "rupture");
  }

  // 예외 처리
  return undefined;
};

const getAnalysisResultExist = (props: GetAnalysisResultExistProps) => {
  const { analysis } = props;
  // 파열 존재 여부 확인
  const isRuptureExist =
    analysis?.labels?.some(
      ({ result_type, result_class }: AnalysisLabel) =>
        result_type === "rupture" && result_class === "exist"
    ) ?? false;
  // 실리콘 피막 침범 존재 여부 확인
  const isInvasionToCapsuleExist =
    analysis?.labels?.some(
      (label) =>
        label?.result_type === "silicone_invasion_to_capsule" &&
        label?.result_class === "exist"
    ) ?? false;
  // 실리콘 림프절 침범 존재 여부 확인
  const isInvasionToLymphNodeExist =
    analysis?.labels?.some(
      (label) =>
        label?.result_type === "silicone_invasion_to_ln" &&
        label?.result_class === "exist"
    ) ?? false;

  return {
    isRuptureExist,
    isInvasionToCapsuleExist,
    isInvasionToLymphNodeExist,
  };
};

// ROI 좌표 저장
const getRoiCoordinates = (analysisResult: AnalysisLabel | undefined) => {
  return analysisResult?.points
    .filter(Array.isArray)
    .map((group: any) =>
      Array.isArray(group)
        ? group.map(
            ([x, y]) =>
              new Point(
                Number(String(x).replace(/,/g, "")),
                Number(String(y).replace(/,/g, ""))
              )
          )
        : []
    );
};

export {
  getImageCommentSummary,
  getEachImageComment,
  getImageStatus,
  getAnalysisResult,
  getAnalysisResultExist,
  getRoiCoordinates,
};
