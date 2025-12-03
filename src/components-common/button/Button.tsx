interface ButtonProps {
  width?: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({
  width = "w-full",
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${width} h-[40px] rounded-[6px] px-[15px] flex items-center justify-center transition-all duration-100
      ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-component-disabled"
          : " bg-blue-300 hover:bg-blue-400 cursor-default"
      }
      `}
      onClick={onClick}
    >
      <p className="text-[14px] text-white font-pretendard font-medium">
        {label}
      </p>
    </button>
  );
};

export default Button;
