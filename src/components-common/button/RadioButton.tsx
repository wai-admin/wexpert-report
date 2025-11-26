interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioButton = ({ label, checked, onChange }: RadioButtonProps) => {
  return (
    <label className="text-[16px] cursor-pointer font-pretendard flex items-center gap-[10px] text-white">
      <input
        type="radio"
        value={label}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-[18px] h-[18px] flex items-center justify-center rounded-full bg-transparent border-[1.5px] ${
          checked ? "border-blue-300" : "border-solid-lt"
        }`}
      >
        <div
          className={`w-[10px] h-[10px] rounded-full ${
            checked ? "bg-blue-300 scale-100" : "bg-transparent scale-0"
          } transition-scale duration-200`}
        />
      </div>
      {label}
    </label>
  );
};

export default RadioButton;
