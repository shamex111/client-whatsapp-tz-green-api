export interface IContactInfoResponse {
  avatar: string;
  category: string;
  chatId: string;
  contactName: string;
  description: string;
  email: string;
  isArchive: boolean;
  isBusiness: boolean;
  isDisappearing: boolean;
  isMute: boolean;
  lastMessage: string;
  lastSeen: null;
  messageExpiration: number;
  muteExpiration: null;
  name: string;
  products: [];
  messages: {
    id: number;
    quotedMessage: string;
    extendedMessage: string;
  }[];
}
