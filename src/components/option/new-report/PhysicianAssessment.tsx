import { OptionField } from "@/components";

interface PhysicianAssessmentProps {
  value: string;
  onChange: (value: string) => void;
}

const PhysicianAssessment = ({ value, onChange }: PhysicianAssessmentProps) => {
  return (
    <OptionField
      label="Physician's Assessment"
      subLabel={`${value.length}/1000`}
    >
      <div className="h-[120px] flex items-center bg-[rgba(65,65,65,1)] rounded-[6px] border border-[rgba(201,201,201,1)] px-[15px] py-[10px]">
        <textarea
          className="w-full h-full text-[16px] text-white font-pretendard resize-none bg-transparent outline-none border-none"
          // placeholder="Up to 1000 characters"
          maxLength={1000}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </OptionField>
  );
};

export default PhysicianAssessment;
