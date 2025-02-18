import { ACCESS_ID, ACCESS_TOKEN } from "../constants";

class TokenService {
  public setAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  public deleteAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  public getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public setAccessId(accessToken: string) {
    localStorage.setItem(ACCESS_ID, accessToken);
  }

  public getAccessId() {
    return localStorage.getItem(ACCESS_ID);
  }
}

export default new TokenService();
