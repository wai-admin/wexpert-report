import { OptionDisabledField, OptionField } from "@/components";

interface NameProps {
  value: string;
}

const Name = ({ value }: NameProps) => {
  return (
    <OptionField label="Name">
      <OptionDisabledField value={value} />
    </OptionField>
  );
};

export default Name;
