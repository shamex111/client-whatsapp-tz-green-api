export interface IAuthRequest {
  idInstance: string;
  apiTokenInstance: string;
}

export interface ICheckContactResponse {
  existsWhatsapp: boolean;
}

export interface IAuthResponse {
  avatar: string;
  deviceId: string;
  phone: string;
  stateInstance: "authorized" | "unauthorized";
}
