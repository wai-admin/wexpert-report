import { numberedList } from "./templates/numberedList";

const ruptureRiskLevel = (id: string) => `
  <div id="${id}" class="column">
      ${numberedList(4, "파열 위험 등급")}
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
`;

export { ruptureRiskLevel };
