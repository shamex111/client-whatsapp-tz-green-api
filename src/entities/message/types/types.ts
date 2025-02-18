export interface IAllMessageResponse {
  chatId: string;
  deletedMessageId: string;
  editedMessageId: string;
  extendedTextMessage: {
    description: string;
    forwardingScore: number;
    isForwarded: boolean;
    jpegThumbnail: string;
    previewType: string;
    text: string;
    title: string;
  };
  quotedMessage: {
    participant: string;
    deletedMessageId: string;
    editedMessageId: string;
    extendedTextMessage: {
      text: string;
      description: string;
      title: string;
      previewType: string;
      jpegThumbnail: string;
    };
    idMessage: string;
    isDeleted: boolean;
    isEdited: boolean;
    stanzaId: string;
    sendByApi: boolean;
    statusMessage: string;
    textMessage?: string;
    timestamp: number;
    type: string;
    typeMessage: string;
  };
  textMessage?: string;
}
