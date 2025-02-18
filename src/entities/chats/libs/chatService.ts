import { ICheckContactResponse } from "@/entities/auth/types/types";
import tokenService from "@/entities/token/libs/tokenService";
import { axiosAuth } from "@/shared/api/baseQuery";

class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  public async checkWhatsapp(request: {
    phoneNumber: string;
  }): Promise<ICheckContactResponse> {
    const token = tokenService.getAccessToken();
    const { data } = await axiosAuth.post<ICheckContactResponse>(
      `/checkWhatsapp/${token}`,
      request
    );
    return data;
  }
}

export const { checkWhatsapp } = ChatService.getInstance();
