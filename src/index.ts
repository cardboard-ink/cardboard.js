// import axios, { AxiosInstance } from "axios";
// import { URLSearchParams } from "url";
// import { GuildedUser, IGetToken, Alias, UserStatus, Content, Document, CustomReaction, AboutInfo } from "./types";

// export { GuildedUser, IGetToken, Alias, UserStatus, Content, Document, CustomReaction, AboutInfo };
// /**
//  * The main class for the cardboard api
//  */
// export class Cardboard {
//   private _baseurl: string;
//   private _axios: AxiosInstance;
//   /**
//    * The client id of the application
//    */
//   protected client_id: string;
//   /**
//    * The client secret of the application
//    */
//   protected client_secret: string;

//   constructor(client_id: string, client_secret: string, local = false) {
//     // this is the base url of the carboard api
//     this._baseurl = "https://cardboard.ink/api/v1/";
//     if (local) {
//       this._baseurl = "http://localhost:5173/api/v1/";
//     }
//     this._axios = axios.create({ baseURL: this._baseurl });
//     this.client_id = client_id;
//     this.client_secret = client_secret;
//   }

//   /**
//    * @param code The code recieved from cardboard redirect according to the oauth2 flow
//    * @returns The token object 
//    * 
//    * ```ts
//    * app.get("/login", async (req, res) => {
//    *  const code = req.query.code as string
//    *  // initializes long term session on cardboard's end (30 days)
//    *  const loginData = await cb.exchangeInitialToken(code)
//    *  // your logic to set session in your app
//    *  at = loginData.access_token
//    *  res.send(loginData)
//    *  return
//    * })
//    * ```
//    */
//   public async exchangeInitialToken(code: string): Promise<IGetToken> {
//     const grant_type = "authorization_code";
//     const response = await this._axios.post(
//       "token",
//       new URLSearchParams({
//         code,
//         client_id: this.client_id,
//         client_secret: this.client_secret,
//         grant_type,
//       })
//     );
//     return response.data as IGetToken;
//   }

//   /**
//    * @param refresh_token The refresh token recieved from the initial token exchange
//    * @returns The token object
//    */
//   public async refreshToken(refresh_token: string): Promise<IGetToken> {
//     const grant_type = "refresh_token";
//     const response = await this._axios.post(
//       "token",
//       new URLSearchParams({
//         refresh_token,
//         client_id: this.client_id,
//         client_secret: this.client_secret,
//         grant_type,
//       })
//     );
//     return response.data as IGetToken;
//   }

//   /**
//    * @param access_token The access token recieved from the initial token exchange
//    * @returns The token object
//    * ```ts
//    * app.get("/logout", async (req, res) => {
//    *  // remove session on cardboard's end 
//    *  const logout = await cb.revokeToken(at)
//    *  // your logic to remove session in your app 
//    *  at = ""
//    *  res.send(logout)
//    *  return
//    * })
//    * ```
//    */
//   public async revokeToken(token: string): Promise<void> {
//     await this._axios
//       .post(
//         "token/revoke",
//         new URLSearchParams({
//           client_id: this.client_id,
//           client_secret: this.client_secret,
//           token,
//         })
//       )
//       .catch((err) => {
//         console.log(err);
//       });
//     return;
//   }

//   /**
//    * @param access_token The access token recieved from the initial token exchange
//    * @returns The validity of the token
//    */
//   public async checkToken(access_token: string): Promise<any> {
//     const token = access_token;
//     const response = await this._axios.post(
//       "token/check",
//       new URLSearchParams({ token })
//     );
//     return response.data;
//   }

//   /**
//    * @param access_token The access token recieved from the initial token exchange
//    * @returns The user info
//    * ```ts
//    * app.get("/user", async (req, res) => {
//    *  if (at === "") {
//    *      res.send(`<h1>Not logged in</h1> <a href='https://cardboard.ink/auth?client_id=${clientId}'>Login</a>`)
//    *      return
//    *  }
//    *  const user = await cb.getUserInfo(at)
//    *  res.json(user)
//    *  return
//    * })
//    * ```
//    */
//   public async getUserInfo(access_token: string): Promise<GuildedUser> {
//     const response = await this._axios.get("users/@me", {
//       headers: { authorization: `Bearer ${access_token}` },
//     });
//     return response.data as GuildedUser;
//   }
// }

import { URLSearchParams } from "url";
import { GuildedUser, IGetToken, Alias, UserStatus, Content, Document, CustomReaction, AboutInfo } from "./cardboard.types";

export { GuildedUser, IGetToken, Alias, UserStatus, Content, Document, CustomReaction, AboutInfo };

/**
 * The main class for the cardboard api
 */
export class Cardboard {
  private _baseurl: string;
  /**
   * The client id of the application
   */
  protected client_id: string;
  /**
   * The client secret of the application
   */
  protected client_secret: string;

  constructor(client_id: string, client_secret: string, local = false) {
    // this is the base url of the carboard api
    this._baseurl = "https://cardboard.ink/api/v1/";
    if (local) {
      this._baseurl = "http://localhost:5173/api/v1/";
    }
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  /**
   * @param code The code recieved from cardboard redirect according to the oauth2 flow
   * @returns The token object 
   * 
   * ```ts
   * app.get("/login", async (req, res) => {
   *  const code = req.query.code as string
   *  // initializes long term session on cardboard's end (30 days)
   *  const loginData = await cb.exchangeInitialToken(code)
   *  // your logic to set session in your app
   *  at = loginData.access_token
   *  res.send(loginData)
   *  return
   * })
   * ```
   */
  public async exchangeInitialToken(code: string): Promise<IGetToken> {
    const grant_type = "authorization_code";
    const response = await fetch(`${this._baseurl}token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type,
      }).toString(),
    });
    return response.json() as Promise<IGetToken>;
  }

  /**
   * @param refresh_token The refresh token recieved from the initial token exchange
   * @returns The token object
   */
  public async refreshToken(refresh_token: string): Promise<IGetToken> {
    const grant_type = "refresh_token";
    const response = await fetch(`${this._baseurl}token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token,
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type,
      }).toString(),
    });
    return response.json() as Promise<IGetToken>;
  }

  /**
   * @param access_token The access token recieved from the initial token exchange
   * @returns The token object
   * ```ts
   * app.get("/logout", async (req, res) => {
   *  // remove session on cardboard's end 
   *  const logout = await cb.revokeToken(at)
   *  // your logic to remove session in your app 
   *  at = ""
   *  res.send(logout)
   *  return
   * })
   * ```
   */
  public async revokeToken(token: string): Promise<void> {
    await fetch(`${this._baseurl}token/revoke`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: this.client_id,
        client_secret: this.client_secret,
        token,
      }).toString(),
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * @param access_token The access token recieved from the initial token exchange
   * @returns The validity of the token
   */
  public async checkToken(access_token: string): Promise<any> {
    const response = await fetch(`${this._baseurl}token/check`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token: access_token }).toString(),
    });
    return response.json();
  }

  /**
   * @param access_token The access token recieved from the initial token exchange
   * @returns The user info
   * ```ts
   * app.get("/user", async (req, res) => {
   *  if (at === "") {
   *      res.send(`<h1>Not logged in</h1> <a href='https://cardboard.ink/auth?client_id=${clientId}'>Login</a>`)
   *      return
   *  }
   *  const user = await cb.getUserInfo(at)
   *  res.json(user)
   *  return
   * })
   * ```
   */
  public async getUserInfo(access_token: string): Promise<GuildedUser> {
    const response = await fetch(`${this._baseurl}users/@me`, {
      headers: { authorization: `Bearer ${access_token}` },
    });
    return response.json() as Promise<GuildedUser>;
  }
}

