import { API_BASE_URL, DEFAULT_OPTIONS } from "@/constants/api";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { authUtils } from "@/store";
import { checkTruthy } from "@/utils/common";

// 인증이 필요한 API용 axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_OPTIONS.headers,
  timeout: 10000,
});

// 요청 인터셉터 - 인증 헤더 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = authUtils.getAccessToken();
    // if (checkTruthy(accessToken)) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3LXo4cWYwX283dzlLRHViMlZHa1JqZFVCYWZYRjlIMGlIVVRQVEZsNlJvIn0.eyJleHAiOjE3NTU1ODAyMjEsImlhdCI6MTc1NTU3ODQyMSwianRpIjoiZGIyODk1OGQtNTZjZS00NzZmLWI1M2UtZTJiN2IzZTBiNzNiIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay9yZWFsbXMvd2FpLXdleHBlcnQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODAxOTA4OTYtNGM2Zi00NTE5LTk4MDItNTJlOGJkN2U1MzdhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2V4cGVydC1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNDE4NGY5MTktNDM1ZS00ZWIzLWIyNDctNjI1NDg1YjJjYjcwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXdhaS13ZXhwZXJ0Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjQxODRmOTE5LTQzNWUtNGViMy1iMjQ3LTYyNTQ4NWIyY2I3MCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwieC1saWNlbnNlIjp7ImV4cGlyZXNfYXQiOiIyMDI2LTAzLTI2VDAwOjAwOjAwLjAwMFoiLCJjb25zdWx0YXRpb25fcGxhbiI6InByZW1pdW0iLCJ2YWxpZF9mcm9tIjoiMjAyNS0wMy0yNlQwMDowMDowMC4wMDBaIiwibW9kZWxfcGxhbiI6InByZW1pdW0ifSwicmVtb3ZlZF9zZXNzaW9ucyI6ImQ3M2RmNWE1LWYwNWQtNDUzNy1hZTJmLTVhNzFlMTEwMWE3MyIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3Q5IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.O_SMl8WZoHpGCkCsXgocbmJiPWNk1nSYqCvAZB6fQ0P9d-2SHGC4Wf6YmEcro5qR3yHBdYCf9u9lLVsXAbGjKIwaECzLT23qSP1e7zgzYesCDsqhREOYqoQ3Oz5zh9ti84TFJAzueBU8C37bQ5IpcrWyfmG9f0uF1uZMByZMHWgm0OC2Sd7I_KaunFUkytteGR-7e7FB04669wWZbQGaFPsLQdKSlK23qXsdUJTSWCDZR5M4TNR9aLJJsI4WrspGM2m53qchP2-l_N5GO6em1PE_yiQlqNE1MyC4Lf9brSQzpofyLrq4Ng9fkYeuFjZxDxPR-ixfZIGCJb6dZT0EAQ`;

    // FormData인 경우 Content-Type 헤더 제거 (axios가 자동 설정)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인증이 필요한 요청용 API 클라이언트
export const apiFetch = {
  // GET 요청
  async get<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(
      endpoint,
      config
    );
    return response.data;
  },

  // POST 요청
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(
      endpoint,
      data,
      config
    );
    return response.data;
  },

  // PUT 요청
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(
      endpoint,
      data,
      config
    );
    return response.data;
  },

  // DELETE 요청
  async delete<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(
      endpoint,
      config
    );
    return response.data;
  },

  // PATCH 요청
  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.patch(
      endpoint,
      data,
      config
    );
    return response.data;
  },
};
// const {
//   data: selectedPatient,
//   isLoading: patientLoading,
//   error: patientError,
// } = useQuery({
//   queryKey: createQueryKey.patient.detail(selectedPatientId!),
//   queryFn: () => patientApi.getPatient(selectedPatientId!),
//   enabled: !!selectedPatientId, // selectedPatientId가 있을 때만 실행
// });
