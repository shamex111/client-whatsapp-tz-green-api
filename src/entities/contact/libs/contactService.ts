import { axiosAuth } from "@/shared/api/baseQuery";
import { IContactInfoResponse } from "../types/types";
import tokenService from "@/entities/token/libs/tokenService";

class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  public async getContactInfo(request: {
    chatId: string;
  }): Promise<IContactInfoResponse> {
    const token = tokenService.getAccessToken();
    const { data } = await axiosAuth.post<IContactInfoResponse>(
      `/getContactInfo/${token}`,
      request
    );
    return data;
  }
}

export const { getContactInfo } = ChatService.getInstance();
