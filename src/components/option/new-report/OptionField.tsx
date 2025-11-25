import { ReactNode } from "react";

interface OptionFieldProps {
  label: string;
  subLabel?: string;
  children: ReactNode;
}

interface OptionDisabledFieldProps {
  value: string;
}

const OptionField = ({ label, subLabel, children }: OptionFieldProps) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="flex items-end justify-between">
        <p className="text-[16px] text-white font-medium font-pretendard">
          {label}
        </p>
        {subLabel && (
          <p className="text-[13px] text-text-tertiary font-pretendard">
            {subLabel}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

const OptionDisabledField = ({ value }: OptionDisabledFieldProps) => {
  return (
    <div className="w-full h-[40px] flex items-center bg-[rgba(65,65,65,1)] rounded-[6px] border border-[rgba(201,201,201,1)] px-[15px]">
      <p className="text-[16px] text-solid-lt font-pretendard">{value}</p>
    </div>
  );
};

const Divider = () => {
  return <div className="w-full min-h-[1px] bg-white" />;
};

export { OptionField, OptionDisabledField, Divider };
