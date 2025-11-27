import { PrintPageData } from "@/types";

interface AllPatientsControllerProps {
  printPageData: PrintPageData | null;
  onPrint: () => void;
}

const AllPatientsController = ({
  printPageData,
  onPrint,
}: AllPatientsControllerProps) => {
  return <div>AllPatientsController</div>;
};

export default AllPatientsController;
