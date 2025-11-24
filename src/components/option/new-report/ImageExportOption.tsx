import { OptionField } from "@/components";
import { RadioButton } from "@/components-common";
import { ImageExportOptionValues } from "@/types";

interface ImageExportOptionProps {
  checkedOption: ImageExportOptionValues;
  onChange: (value: ImageExportOptionValues) => void;
}

const ImageExportOption = ({
  checkedOption,
  onChange,
}: ImageExportOptionProps) => {
  return (
    <OptionField label="Image Export Option">
      <div className="flex flex-row items-center gap-[24px]">
        <RadioButton
          label="All Images"
          checked={checkedOption === ImageExportOptionValues.ALL_IMAGE}
          onChange={() => onChange(ImageExportOptionValues.ALL_IMAGE)}
        />
        <RadioButton
          label="Rupture Case"
          checked={checkedOption === ImageExportOptionValues.RUPTURE_CASE}
          onChange={() => onChange(ImageExportOptionValues.RUPTURE_CASE)}
        />
      </div>
    </OptionField>
  );
};

export default ImageExportOption;
