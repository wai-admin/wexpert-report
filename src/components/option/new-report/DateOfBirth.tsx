import { OptionField, OptionDisabledField } from "@/components";
import { parseBirthDate } from "@/utils";

interface DateOfBirthProps {
  birth: string;
}

const DateOfBirth = ({ birth }: DateOfBirthProps) => {
  const { birthYear, birthMonth, birthDay } = parseBirthDate(birth);

  return (
    <OptionField label="Date of Birth">
      <div className="w-full flex gap-[10px]">
        <OptionDisabledField value={birthYear} />
        <OptionDisabledField value={birthMonth} />
        <OptionDisabledField value={birthDay} />
      </div>
    </OptionField>
  );
};

export default DateOfBirth;
