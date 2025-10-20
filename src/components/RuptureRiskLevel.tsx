import { NumberedList } from "@/components";
import { useTranslation } from "react-i18next";

const RISK_SCORE = 75;
const ARROW_WIDTH = 10;
const ARROW_HEIGHT = 8;

interface RuptureRiskLevelProps {
  id: string;
}

const RuptureRiskLevel = ({ id }: RuptureRiskLevelProps) => {
  const { t: i18n } = useTranslation();

  return (
    <div id={id} className="column">
      <NumberedList
        number={4}
        title={i18n("numberedList.rupture-risk-level")}
      />
      <div className="risk-container">
        <div className="risk-score-box">
          <div className="risk-score">{RISK_SCORE}</div>
          <div className="column">
            <div className="risk-guage" />
            <img
              src="/images/guage-arrow.png"
              alt="risk-guage"
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              style={{
                marginTop: "6px",
                marginLeft: `calc(${RISK_SCORE}% - ${ARROW_WIDTH / 2}px)`,
              }}
            />
          </div>
        </div>
        <div className="risk-status-box">
          <div className="risk-status">Intermediate Risk</div>
          <div className="risk-description">
            중간 수준의 위험이 확인되어, 정기적인 추적 관찰과 추가 검사가 필요할
            수 있습니다.
          </div>
        </div>
      </div>
      <div className="rupture-risk-warning">
        {i18n("rupture-risk-level.warning")}
      </div>
    </div>
  );
};

export default RuptureRiskLevel;
