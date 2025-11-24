import { OptionDisabledField, OptionField } from "@/components";

interface ChartNumberProps {
  value: string;
}

const ChartNumber = ({ value }: ChartNumberProps) => {
  return (
    <OptionField label="Chart Number">
      <OptionDisabledField value={value} />
    </OptionField>
  );
};

export default ChartNumber;
