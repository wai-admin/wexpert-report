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
      className={`${width} h-[40px] bg-blue-300 hover:bg-blue-400 rounded-[6px] px-[15px] flex items-center justify-center transition-all duration-100`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className="text-[16px] text-white font-pretendard font-medium">
        {label}
      </p>
    </button>
  );
};

export default Button;
