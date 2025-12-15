export interface AllPatientReportListResponse {
  data: AllPatientReportListData;
}

export interface AllPatientReportListData {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  data: AllPatientReportListDetailData[];
}

export interface AllPatientReportListDetailData {
  reportId: number;
  patientId: number;
  chartNumber: string;
  patientName: string;
  patientBirthDate: string;
  createdAt: string;
}
