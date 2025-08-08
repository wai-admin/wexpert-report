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

    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3LXo4cWYwX283dzlLRHViMlZHa1JqZFVCYWZYRjlIMGlIVVRQVEZsNlJvIn0.eyJleHAiOjE3NTQ2NDI4MDQsImlhdCI6MTc1NDY0MTAwNCwianRpIjoiZjNkODY4YTQtNmM1ZC00Y2FmLWEzZmItZDRiMmNlZDg0NTU5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODEvcmVhbG1zL3dhaS13ZXhwZXJ0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjgwMTkwODk2LTRjNmYtNDUxOS05ODAyLTUyZThiZDdlNTM3YSIsInR5cCI6IkJlYXJlciIsImF6cCI6IndleHBlcnQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjVhOGJmZmJjLWYxMjctNGJkYi04MzM4LTk3YWY3YmFjOThjMyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy13YWktd2V4cGVydCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI1YThiZmZiYy1mMTI3LTRiZGItODMzOC05N2FmN2JhYzk4YzMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIngtbGljZW5zZSI6eyJleHBpcmVzX2F0IjoiMjAyNi0wMy0yNlQwMDowMDowMC4wMDBaIiwiY29uc3VsdGF0aW9uX3BsYW4iOiJwcmVtaXVtIiwidmFsaWRfZnJvbSI6IjIwMjUtMDMtMjZUMDA6MDA6MDAuMDAwWiIsIm1vZGVsX3BsYW4iOiJwcmVtaXVtIn0sInJlbW92ZWRfc2Vzc2lvbnMiOiJlNzE1YTQ2My1kZjM3LTQyY2YtOGIwZi1mYWQxMmIwMzk4MjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0OSIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiJ9.g11vsk1cNPrhRLXePqpywxdQmVCmo3-XgDQ8-11kwf0Esn3h0TTa2iVn9zAbopwnS6uKRxoJ9KZ6CORF2pgSdhFJHOK5UYHTHKKFxrwCNypu_Qp56wpZJ5F4Vawo6xs6awecvKYgS3ZOKSz_wKMtb3TouowWhSfnJ4mstJIRib-OcocSuvaAnzRzC6gqJjZoyjA1TOkpxsLAjJ7xOZKNpo1jju7GpKkOECASYcQL328H9SLZd7Vb7k05hhyL8vGrKjGIjyyDUB5-3TE12-rQTPmN_LgaEiOQSskOoIwNMRuWVV7VN-ncphGLnw-0Ppi6u_BSTx4J3TvwlnYvoHa_0Q`;

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
