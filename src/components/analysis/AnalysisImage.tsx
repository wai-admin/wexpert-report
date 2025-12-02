import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ROICoordinate, type ImageSize } from "@/utils/roi";
import { checkFalsy, checkTruthy } from "@/utils/common";
import { ROIOverlay } from "@/components";

interface AnalysisImageProps {
  imageUrl: string;
  originalFileName: string;
  coordinates: ROICoordinate[][];
}

const AnalysisImage = ({
  imageUrl,
  originalFileName,
  coordinates,
}: AnalysisImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [originalImageSize, setOriginalImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });
  const [displayImageSize, setDisplayImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });
  const [isImageError, setIsImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // 이미지 크기 변경 감지
  useEffect(() => {
    if (checkFalsy(imageRef.current) || checkFalsy(isImageLoaded)) return;

    const updateDisplaySize = () => {
      const img = imageRef.current;
      if (checkTruthy(img)) {
        setDisplayImageSize({
          width: img.offsetWidth,
          height: img.offsetHeight,
        });
      }
    };

    // 좌표 반응형 처리
    const resizeObserver = new ResizeObserver(updateDisplaySize);
    resizeObserver.observe(imageRef.current);

    updateDisplaySize();

    return () => {
      if (checkTruthy(imageRef.current)) {
        resizeObserver.unobserve(imageRef.current);
        imageRef.current = null;
      }
    };
  }, [isImageLoaded]);

  const handleImageError = () => {
    setIsImageError(true);
  };

  // 이미지 로드 완료 시 크기 저장
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // 원본 이미지 크기 저장
    setOriginalImageSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
    // 실제 표시되는 이미지 크기 저장
    setDisplayImageSize({ width: img.offsetWidth, height: img.offsetHeight });
    // 다음 프레임에서 렌더링 완료 확인
    requestAnimationFrame(() => {
      setIsImageLoaded(true);
    });
  };

  return (
    <div className="analysis-img-container">
      {isImageError ? (
        <div className="analysis-img-error">
          일시적인 오류로 인해 <br /> 이미지를 불러올 수 없습니다. <br />
          <br /> 잠시 후 다시 시도해주세요.
        </div>
      ) : (
        <img
          ref={imageRef}
          src={imageUrl}
          alt={originalFileName}
          className="analysis-img"
          onError={handleImageError}
          onLoad={onImageLoad}
        />
      )}
      <ROIOverlay
        coordinates={coordinates}
        originalSize={originalImageSize}
        displaySize={displayImageSize}
      />
    </div>
  );
};

export default AnalysisImage;
