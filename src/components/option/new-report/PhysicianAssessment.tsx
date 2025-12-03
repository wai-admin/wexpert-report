import { ChangeEvent } from "react";
import { OptionField } from "@/components";
import { useReportStore } from "@/store";
import { ELEMENT } from "@/constants";

const PhysicianAssessment = () => {
  const { physicianAssessment, setPhysicianAssessment } = useReportStore();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPhysicianAssessment(e.target.value);

    // PrintPage에서 스크롤 처리를 위해 요소 ID 사용
    const assessmentEl = document.getElementById(
      `${ELEMENT.A4_CONTAINER}-${ELEMENT.ASSESSMENT}`
    );
    if (assessmentEl) {
      assessmentEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <OptionField
      label="Physician's assessment"
      subLabel={`${physicianAssessment.length}/1000`}
    >
      <div className="h-[120px] flex items-center bg-transparent rounded-[6px] border border-solid-lt px-[15px] py-[10px]">
        <textarea
          className="w-full h-full text-[16px] text-white font-pretendard resize-none bg-transparent outline-none border-none"
          placeholder="Up to 1000 characters"
          maxLength={1000}
          value={physicianAssessment}
          onChange={handleChange}
        />
      </div>
    </OptionField>
  );
};

export default PhysicianAssessment;
