interface RadioIndicatorProps {
  checked: boolean;
}

const RadioIndicator = ({ checked }: RadioIndicatorProps) => {
  return (
    <div
      className={`w-[18px] h-[18px] flex items-center justify-center rounded-full bg-transparent border-[1.5px] ${
        checked ? "border-blue-300" : "border-solid-lt"
      }`}
    >
      <div
        className={`w-[12px] h-[12px] rounded-full ${
          checked ? "bg-blue-300 scale-100" : "bg-transparent scale-0"
        } transition-scale duration-200`}
      />
    </div>
  );
};

export default RadioIndicator;
