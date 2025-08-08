import { format } from "date-fns";

const formatAnalysisDate = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy hh:mm a");
};

export { formatAnalysisDate };
