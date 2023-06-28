import axios, { AxiosInstance } from "axios";
import { URLSearchParams } from "url";
import { GuildedUser, IGetToken } from "./types";

export class Cardboard {
  private _baseurl: string;
  private _axios: AxiosInstance;
  protected client_id: string;
  protected client_secret: string;

  constructor(client_id: string, client_secret: string, local = false) {
    // this is the base url of the carboard api
    this._baseurl = "https://cardboard.ink/api/v1/";
    if (local) {
      this._baseurl = "http://localhost:5173/api/v1/";
    }
    this._axios = axios.create({ baseURL: this._baseurl });
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  public async exchangeInitialToken(code: string): Promise<IGetToken> {
    const grant_type = "authorization_code";
    const response = await this._axios.post(
      "token",
      new URLSearchParams({
        code,
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type,
      })
    );
    return response.data;
  }

  public async refreshToken(refresh_token: string): Promise<IGetToken> {
    const grant_type = "refresh_token";
    const response = await this._axios.post(
      "token",
      new URLSearchParams({
        refresh_token,
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type,
      })
    );
    return response.data;
  }
  public async revokeToken(token: string): Promise<void> {
    await this._axios
      .post(
        "token/revoke",
        new URLSearchParams({
          client_id: this.client_id,
          client_secret: this.client_secret,
          token,
        })
      )
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  public async checkToken(access_token: string): Promise<any> {
    const token = access_token;
    const response = await this._axios.post(
      "token/check",
      new URLSearchParams({ token })
    );
    return response.data;
  }

  public async getUserInfo(access_token: string): Promise<GuildedUser> {
    const response = await this._axios.get("users/@me", {
      headers: { authorization: `Bearer ${access_token}` },
    });
    return response.data;
  }
}
