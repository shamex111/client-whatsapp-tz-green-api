import { IContactInfoResponse } from "@/entities/contact/types/types";
import { IAllMessageResponse } from "../../types/types";

export interface IMessageState {
  dialogsUnique: Array<IContactInfoResponse>;
  allMessages: Array<IAllMessageResponse>;
}
