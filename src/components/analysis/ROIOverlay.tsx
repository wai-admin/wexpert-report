import { Point } from "rulyotano.math.geometry";
import {
  scaleROICoordinates,
  getValidROIGroups,
  createBezierSVGPathData,
  calculateScaleFactors,
  type ImageSize,
} from "@/utils/roi";
import { checkFalsy } from "@/utils/common";

interface ROIOverlayProps {
  coordinates: Point[][];
  originalSize: ImageSize;
  displaySize: ImageSize;
}

// ROI Path 요소 생성
const createROIPaths = (
  coordinates: Point[][],
  originalSize: ImageSize,
  displaySize: ImageSize
) => {
  const scaleFactors = calculateScaleFactors(originalSize, displaySize);
  const scaledCoordinates = scaleROICoordinates(coordinates, scaleFactors);
  const validGroups = getValidROIGroups(scaledCoordinates);

  return validGroups.map((group, idx) => {
    const pathData = createBezierSVGPathData(group);
    return (
      <path key={idx} d={pathData} fill="url(#roi-gradient)" opacity={0.9} />
    );
  });
};

/**
 * ROI 오버레이 컴포넌트
 */
const ROIOverlay = ({
  coordinates,
  originalSize,
  displaySize,
}: ROIOverlayProps) => {
  if (
    checkFalsy(coordinates.length) ||
    checkFalsy(displaySize.width) ||
    checkFalsy(displaySize.height)
  ) {
    return <></>;
  }

  const paths = createROIPaths(coordinates, originalSize, displaySize);

  if (checkFalsy(paths.length)) {
    return <></>;
  }

  return (
    <svg
      className="roi-overlay"
      width={displaySize.width}
      height={displaySize.height}
    >
      <ROIGradient />
      {paths}
    </svg>
  );
};

export default ROIOverlay;

/**
 * ROI 그라데이션 정의
 */
const ROIGradient = () => (
  <defs>
    <radialGradient id="roi-gradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
      <stop offset="40%" stopColor="#fff200" stopOpacity="0.74" />
      <stop offset="60%" stopColor="#b5e61d" stopOpacity="0.63" />
      <stop offset="100%" stopColor="#99d9ea" stopOpacity="0.25" />
    </radialGradient>
  </defs>
);
