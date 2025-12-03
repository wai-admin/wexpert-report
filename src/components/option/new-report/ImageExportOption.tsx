import { OptionField } from "@/components";
import { RadioButton } from "@/components-common";
import { ImageExportOptionValues } from "@/types";
import { useReportStore } from "@/store";

const ImageExportOption = () => {
  const { imageExportOption, setImageExportOption } = useReportStore();

  return (
    <OptionField label="Export option">
      <div className="flex flex-row items-center gap-[24px]">
        <RadioButton
          label="All Image"
          checked={imageExportOption === ImageExportOptionValues.ALL_IMAGE}
          onChange={() =>
            setImageExportOption(ImageExportOptionValues.ALL_IMAGE)
          }
        />
        <RadioButton
          label="Rupture Case"
          checked={imageExportOption === ImageExportOptionValues.RUPTURE_CASE}
          onChange={() =>
            setImageExportOption(ImageExportOptionValues.RUPTURE_CASE)
          }
        />
      </div>
    </OptionField>
  );
};

export default ImageExportOption;
