import { axiosAuth } from "@/shared/api/baseQuery";
import { IAllMessageResponse } from "../types/types";
import tokenService from "@/entities/token/libs/tokenService";

class MessageService {
  private static instance: MessageService;

  private constructor() {}

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  public async sendMessage(request: { chatId: string; message: string }) {
    const token = tokenService.getAccessToken();
    const { data } = await axiosAuth.post(`/sendMessage/${token}`, request);
    return data;
  }

  public async getMessages(request: { chatId: string; count: number }) {
    const token = tokenService.getAccessToken();
    const { data } = await axiosAuth.post(`/getChatHistory/${token}`, request);
    return data;
  }

  public async getAllMessages({
    minutes,
  }: {
    minutes: number;
  }): Promise<Array<IAllMessageResponse>> {
    const token = tokenService.getAccessToken();
    const { data } = await axiosAuth.get<Array<IAllMessageResponse>>(
      `/lastOutgoingMessages/${token}?minutes=${minutes}`
    );
    return data;
  }
}

export const { sendMessage, getAllMessages } = MessageService.getInstance();
