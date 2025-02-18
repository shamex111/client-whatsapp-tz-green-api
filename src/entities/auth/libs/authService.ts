import { axiosNoAuth } from "@/shared/api/baseQuery";
import { IAuthRequest, IAuthResponse } from "../types/types";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async authorization({
    apiTokenInstance,
    idInstance,
  }: IAuthRequest): Promise<IAuthResponse> {
    const { data } = await axiosNoAuth.get<IAuthResponse>(
      `/waInstance${idInstance}/getWaSettings/${apiTokenInstance}`
    );
    return data;
  }
}

export const { authorization } = AuthService.getInstance();
