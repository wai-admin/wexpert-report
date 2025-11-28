export interface PatientReportListResponse {
  data: PatientReportListDetail[];
}

export interface PatientReportListDetail {
  id: number;
  createdAt: string;
  includeAllImages: boolean;
}
