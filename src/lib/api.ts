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
    const accessToken = authUtils.getAccessToken();
    if (checkTruthy(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3LXo4cWYwX283dzlLRHViMlZHa1JqZFVCYWZYRjlIMGlIVVRQVEZsNlJvIn0.eyJleHAiOjE3NTcyOTI1MDQsImlhdCI6MTc1NzI5MDcwNCwianRpIjoiNTI4ZGQ5NjAtYjg4Zi00OWVkLTgxYjMtOGYyYjI4OWM4NDY2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay9yZWFsbXMvd2FpLXdleHBlcnQiLCJhdWQiOlsid2V4cGVydC1tYW5hZ2VyIiwiYWNjb3VudCJdLCJzdWIiOiI4MDE5MDg5Ni00YzZmLTQ1MTktOTgwMi01MmU4YmQ3ZTUzN2EiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZXhwZXJ0LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIwYzVlNDE5MC03NmNkLTQ1MWMtODUyYy0yMjdlNzZmODIyNTQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtd2FpLXdleHBlcnQiLCJvZmZsaW5lX2FjY2VzcyIsInNlcnZpY2UtYWRtaW4iLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsid2V4cGVydC1tYW5hZ2VyIjp7InJvbGVzIjpbIndyaXRlIl19LCJ3ZXhwZXJ0LWNsaWVudCI6eyJyb2xlcyI6WyJ3cml0ZSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMGM1ZTQxOTAtNzZjZC00NTFjLTg1MmMtMjI3ZTc2ZjgyMjU0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJ4LWxpY2Vuc2UiOnsiZXhwaXJlc19hdCI6IjIwMjYtMDMtMjZUMDA6MDA6MDAuMDAwWiIsImNvbnN1bHRhdGlvbl9wbGFuIjoicHJlbWl1bSIsInZhbGlkX2Zyb20iOiIyMDI1LTAzLTI2VDAwOjAwOjAwLjAwMFoiLCJtb2RlbF9wbGFuIjoicHJlbWl1bSJ9LCJyZW1vdmVkX3Nlc3Npb25zIjoiYmI2NmJkNmQtZmRlZi00ZmFlLWIxOWEtZDMyZDJjZDVlYTc2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdDkiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.qzNTiHf1OHxmAVaxn9bFcbbDmuSauHFnOoC70QogDNdPu56i2QpV2FEuB0ae7yQKwgMNxgq0ZoBrd9k4l5Y-qKfSsxvjXmW1kV5U4XKrVDEJSVEH_IruedtxqLC-Blc7Zd3d-br5NxLrldOmu0uO541b9917eY3GW6Itkdg5EKd024p02A37wXDPrP2D_e5X5P6uJvbB2QjTbbeLlIgoDf462MJAIb8in4p-xCMe6Cto3OnIXcNX7VvJaXnZS6-7jr4o6BmC2YHUHoW-C2SUltAtP_8oe7SM3Kd6G21bArWKPeH9uvG9cVz63-bbIWct-iHHWpRQQUgPUk80DFf4jw`;

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
