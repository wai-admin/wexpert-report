import { NumberedList } from "@/components";

interface AnalysisViewerProps {
  id: string;
  analysisCount: number;
  ruptureCount: number;
}

const AnalysisViewer = ({
  id,
  analysisCount,
  ruptureCount,
}: AnalysisViewerProps) => {
  const hasRupture = ruptureCount > 0;

  return (
    <div id={id} className="column">
      <NumberedList number={4} title="부작용 감지 이미지 첨부" />
      <div className="comment-box-image">
        {hasRupture ? (
          <>
            총 {analysisCount}장의 이미지 중 {ruptureCount}장에서 파열이
            감지되었습니다.
          </>
        ) : (
          <>
            총 {analysisCount}장의 이미지를 분석한 결과, 파열이 확인되지
            않았습니다.
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisViewer;
