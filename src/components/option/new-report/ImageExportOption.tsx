import { OptionField } from "@/components";
import { RadioButton } from "@/components-common";
import { ImageExportOptionValues } from "@/types";
import { useNewReportStore } from "@/store";

const ImageExportOption = () => {
  const { imageExportOption, setImageExportOption } = useNewReportStore();

  return (
    <OptionField label="Image Export Option">
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
