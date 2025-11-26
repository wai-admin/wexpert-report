import { OptionField, OptionDisabledField } from "@/components";

interface DateOfBirthProps {
  year: string;
  month: string;
  day: string;
}

const DateOfBirth = ({ year, month, day }: DateOfBirthProps) => {
  return (
    <OptionField label="Date of Birth">
      <div className="w-full flex gap-[10px]">
        <OptionDisabledField value={year} />
        <OptionDisabledField value={month} />
        <OptionDisabledField value={day} />
      </div>
    </OptionField>
  );
};

export default DateOfBirth;
