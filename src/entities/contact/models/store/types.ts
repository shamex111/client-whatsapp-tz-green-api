import { IAuthResponse } from "@/entities/auth/types/types";
import { IContactInfoResponse } from "@/entities/contact/types/types";

export interface IContactState {
  selectContact: IContactInfoResponse | null;
  currentContact: IAuthResponse | null;
}
