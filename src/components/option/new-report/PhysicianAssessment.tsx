import { OptionField } from "@/components";
import { useNewReportStore } from "@/store";

const PhysicianAssessment = () => {
  const { physicianAssessment, setPhysicianAssessment } = useNewReportStore();

  return (
    <OptionField
      label="Physician's Assessment"
      subLabel={`${physicianAssessment.length}/1000`}
    >
      <div className="h-[120px] flex items-center bg-transparent rounded-[6px] border border-solid-lt px-[15px] py-[10px]">
        <textarea
          className="w-full h-full text-[16px] text-white font-pretendard resize-none bg-transparent outline-none border-none"
          placeholder="Up to 1000 characters"
          maxLength={1000}
          value={physicianAssessment}
          onChange={(e) => setPhysicianAssessment(e.target.value)}
        />
      </div>
    </OptionField>
  );
};

export default PhysicianAssessment;
