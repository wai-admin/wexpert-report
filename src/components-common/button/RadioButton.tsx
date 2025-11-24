interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioButton = ({ label, checked, onChange }: RadioButtonProps) => {
  return (
    <label
      className={`text-[16px] cursor-pointer font-pretendard flex items-center gap-[6px] ${
        checked ? "text-white" : "text-text-tertiary"
      }`}
    >
      <input
        type="radio"
        value={label}
        checked={checked}
        onChange={onChange}
        className="w-[18px] h-[18px] m-0 cursor-pointer"
      />
      {label}
    </label>
  );
};

export default RadioButton;
