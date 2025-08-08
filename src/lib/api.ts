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
