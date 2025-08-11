import { useQuery } from "@/hooks/useQuery";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { reportApi } from "@/services/api";
import { useMessageStore } from "@/store";
import { getPatientId, hasValidPatientId } from "@/utils/common";

const Header = () => {
  const { nativeMessage } = useMessageStore();
  const patientId = getPatientId(nativeMessage);

  const { data: reportData } = useQuery({
    queryKey: QUERY_KEYS.REPORT.DETAIL(patientId),
    queryFn: () => reportApi.getReport(patientId),
    enabled: hasValidPatientId(nativeMessage),
  });

  const hospitalName = reportData!.data!.patientSummary?.hospitalName;

  return (
    <div className="header">
      <p className="header-hospital-name">{hospitalName || "병원명"}</p>
      <img src="/images/wexpert.png" className="header-logo" />
    </div>
  );
};

export default Header;
