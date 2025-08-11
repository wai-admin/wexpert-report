import { format } from "date-fns";

const formatAnalysisDate = (date: string) => {
  return format(new Date(date), "yyyy/MM/dd hh:mm a");
};

export { formatAnalysisDate };
