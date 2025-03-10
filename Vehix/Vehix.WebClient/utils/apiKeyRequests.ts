import { apiRequest } from "./apiRequest";

interface IVerifyKeyResponse {
  data: string;
  success: boolean;
}

interface IRequestKeyResponse {
  success: boolean;
}

// API Base URL is already handled in the axiosInstance
export const postVerify = async (
  token: string
): Promise<IVerifyKeyResponse> => {
  return await apiRequest<IVerifyKeyResponse>(
    `/keys/verify?token=${token}`,
    "POST"
  );
};

export const postRequest = async (
  email: string
): Promise<IRequestKeyResponse> => {
  return await apiRequest<IRequestKeyResponse>(
    `/keys/request?user=${email}`,
    "POST"
  );
};
