import { OptionField, OptionDisabledField } from "@/components";
import { parseBirthDate, checkTruthy } from "@/utils";

interface DateOfBirthProps {
  birth: string;
}

const DateOfBirth = ({ birth }: DateOfBirthProps) => {
  const { birthYear, birthMonth, birthDay } = parseBirthDate(birth);

  return (
    <OptionField label="Date of Birth">
      <div className="w-full flex gap-[10px]">
        <OptionDisabledField
          value={checkTruthy(birthMonth) ? birthMonth : "-"}
        />
        <OptionDisabledField value={checkTruthy(birthDay) ? birthDay : "-"} />
        <OptionDisabledField value={checkTruthy(birthYear) ? birthYear : "-"} />
      </div>
    </OptionField>
  );
};

export default DateOfBirth;
