// ROI 좌표 타입 정의
export type ROICoordinate = { x: number; y: number };
export type ROIGroup = ROICoordinate[];
export type ROICoordinates = ROIGroup[];

// 스케일링 관련 타입
export interface ImageSize {
  width: number;
  height: number;
}

export interface ScaleFactors {
  scaleX: number;
  scaleY: number;
}

/**
 * 원본 이미지 크기와 표시 이미지 크기로부터 스케일 비율 계산
 */
export const calculateScaleFactors = (
  originalSize: ImageSize,
  displaySize: ImageSize
): ScaleFactors => {
  const scaleX =
    originalSize.width > 0 ? displaySize.width / originalSize.width : 1;
  const scaleY =
    originalSize.height > 0 ? displaySize.height / originalSize.height : 1;

  return { scaleX, scaleY };
};

/**
 * ROI 좌표를 표시 이미지 크기에 맞춰 스케일링
 */
export const scaleROICoordinates = (
  coordinates: ROICoordinate[][],
  scaleFactors: ScaleFactors
): ROICoordinates => {
  return coordinates.map((group) =>
    group.map((point) => ({
      x: point.x * scaleFactors.scaleX,
      y: point.y * scaleFactors.scaleY,
    }))
  );
};

/**
 * 유효한 ROI 그룹만 필터링 (3개 이상의 점으로 구성된 그룹)
 */
export const getValidROIGroups = (
  coordinates: ROICoordinates
): ROICoordinates => {
  return coordinates.filter((group) => group.length > 2);
};

/**
 * ROI 그룹을 SVG Path 직선 데이터로 변환
 */
export const createSVGPathData = (group: ROICoordinate[]): string => {
  return (
    group
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ") + " Z"
  );
};

/**
 * ROI 그룹을 SVG Path 3차 베지어 곡선 데이터로 변환 (BezierInterpolation 라이브러리 사용, WExpert에서 사용)
 * @ERROR: 특정 이미지의 해상도가 큰 경우, 곡선 데이터를 다르게 표시하는 문제 발생 (consultation id: 20 참고.)
 */
// export const createBezierSVGPathData = (group: ROICoordinate[]): string => {
// 	if (group.length < 3) {
// 		return createSVGPathData(group); // 3점 미만이면 직선 사용
// 	}

// 	// Point 객체로 변환
// 	const points = group.map((coord) => new Point(coord.x, coord.y));

// 	// BezierInterpolation을 사용하여 베지어 곡선 생성 및 SVG Path로 변환
// 	// isClosedCurve: false (열린 곡선), smoothValue: 0.5 (부드러움 정도)
// 	const path = BezierInterpolation.pointsToBezierCurves(points, false, 0.5).toPath();

// 	return path + " Z"; // 폐곡선으로 만들기 위해 Z 추가
// };

/**
 * ROI 그룹을 SVG Path 3차 베지어 곡선 데이터로 변환 (직접 구현)
 */
export const createBezierSVGPathData = (group: ROICoordinate[]): string => {
  if (group.length < 3) {
    return createSVGPathData(group); // 3점 미만이면 직선 사용
  }

  let path = `M ${group[0].x} ${group[0].y}`;

  for (let i = 0; i < group.length - 1; i++) {
    const current = group[i];
    const next = group[i + 1];

    const control1X = current.x + (next.x - current.x) * 0.3;
    const control1Y = current.y + (next.y - current.y) * 0.3;
    const control2X = current.x + (next.x - current.x) * 0.7;
    const control2Y = current.y + (next.y - current.y) * 0.7;

    path += ` C ${control1X} ${control1Y} ${control2X} ${control2Y} ${next.x} ${next.y}`;
  }

  return path + " Z";
};

/**
 * ROI 좌표가 유효한지 확인
 */
export const isValidROI = (coordinates: ROICoordinate[][]): boolean => {
  return coordinates.some((group) => group.length > 2);
};

/**
 * ROI 그룹 수 계산
 */
export const getROIGroupCount = (coordinates: ROICoordinate[][]): number => {
  return coordinates.filter((group) => group.length > 2).length;
};
