interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      className="w-full h-[40px] bg-blue-300 hover:bg-blue-400 rounded-[6px] px-[15px] flex items-center justify-center transition-all duration-100"
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
