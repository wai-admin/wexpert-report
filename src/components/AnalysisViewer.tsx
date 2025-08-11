import { NumberedList, AnalysisResult } from "@/components";
import { ExportOptionType, Sonography } from "@/lib";

interface AnalysisViewerProps {
  analysisItems: Sonography[];
  analysisCount: number;
  ruptureCount: number;
  exportOptionType: ExportOptionType;
}

const AnalysisViewer = ({
  analysisItems,
  analysisCount,
  ruptureCount,
  exportOptionType,
}: AnalysisViewerProps) => {
  const isAllCase = exportOptionType === ExportOptionType.ALL;

  return (
    <div className="column">
      <NumberedList number={4} title="부작용 감지 이미지 첨부" />
      {isAllCase && (
        <div className="comment-box-image">
          총 {analysisCount}장의 이미지 중 {ruptureCount}장에서 파열이
          감지되었습니다.
        </div>
      )}
      {analysisItems.map((item: Sonography, index: number) => (
        <AnalysisResult key={item.id} index={index + 1} item={item} />
      ))}
    </div>
  );
};

export default AnalysisViewer;
