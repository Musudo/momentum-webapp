import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import * as jose from "jose";
import { getCookie, setCookie } from "./cookies";
import axios from "axios";
import { initAxiosServices } from "./axios/axiosLoader";

type TRequestBody = {
  [key: string]: string;
};

class AuthProviderClass {
  static #redirectUri = `${window.location.origin}${
    import.meta.env.VITE_AUTH_SIGNINCALLBACK
  }`;
  static #authUri = `${import.meta.env.VITE_AUTH_AUTHORITY}${
    import.meta.env.VITE_AUTH_AUTHORITY_AUTH_ENDPOINT
  }`;
  static #tokenUri = `${import.meta.env.VITE_AUTH_AUTHORITY}${
    import.meta.env.VITE_AUTH_AUTHORITY_TOKEN_ENDPOINT
  }`;
  static #signoutUri = `${import.meta.env.VITE_AUTH_AUTHORITY}${
    import.meta.env.VITE_AUTH_AUTHORITY_SIGNOUT_ENDPOINT
  }`;

  constructor() {}

  get isAuthenticated() {
    return !!this.authToken;
  }

  get authToken() {
    const authToken = getCookie("authToken");
    try {
      if (!authToken) throw new Error("unauthorized");
      const decodedToken = AuthProviderClass.#decodeJWT(authToken);
      if (!decodedToken || !decodedToken.exp) throw new Error("unauthorized");
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (currentTimestamp > decodedToken.exp) throw new Error("unauthorized");
    } catch (_error) {
      return;
    }
    return authToken;
  }

  get decodedToken() {
    if (this.authToken) return AuthProviderClass.#decodeJWT(this.authToken);
    return "";
  }

  static #cleanUpEncodedString = (encodedString: string) => {
    return encodedString
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  static #decodeJWT = (token: string) => jose.decodeJwt(token);

  static #generateEncodedFormBody = (requestBody: TRequestBody) => {
    const formBody: string[] = [];
    Object.keys(requestBody).forEach((property) => {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(requestBody[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    });
    return formBody.join("&");
  };

  static #generateAuthToken = async (body: TRequestBody) => {
    const formBody = AuthProviderClass.#generateEncodedFormBody(body);
    try {
      const { data } = await axios.post(AuthProviderClass.#tokenUri, formBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      setCookie(
        "authToken",
        data.access_token,
        data.expires_in,
        true,
        "SameSite=Strict"
      );
      sessionStorage.setItem("refreshToken", data.refresh_token);
    } catch (_error) {
      throw new Error("invalid authentication");
    }
  };

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  signin = () => {
    const codeVerifierKey = this.uuidv4();
    const codeVerifier = AuthProviderClass.#cleanUpEncodedString(
      Base64.stringify(sha256(this.uuidv4() + this.uuidv4() + this.uuidv4()))
    );
    const codeChallenge = AuthProviderClass.#cleanUpEncodedString(
      Base64.stringify(sha256(codeVerifier))
    );
    const state = JSON.stringify({
      codeVerifierKey: codeVerifierKey,
      previousPathname: window.location.href,
      retry: true,
    });

    localStorage.setItem(`codeVerifier${codeVerifierKey}`, codeVerifier);
    const redirectUrl = `${AuthProviderClass.#authUri}?client_id=${
      import.meta.env.VITE_AUTH_CLIENTID
    }&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=${
      import.meta.env.VITE_AUTH_CLIENTSCOPES
    }&redirect_uri=${AuthProviderClass.#redirectUri}&state=${state}`;
    return redirectUrl;
  };

  validateSignin = async (
    validationCode: string | null,
    codeVerifierKey: string | null
  ) => {
    const codeVerifier = localStorage.getItem(`codeVerifier${codeVerifierKey}`);

    if (!validationCode || !codeVerifierKey || !codeVerifier)
      throw new Error("Invalid request");
    localStorage.clear();
    const body = {
      grant_type: "authorization_code",
      code: validationCode,
      resource: import.meta.env.VITE_AUTH_RESOURCE,
      redirect_uri: AuthProviderClass.#redirectUri,
      code_verifier: codeVerifier,
      client_id: import.meta.env.VITE_AUTH_CLIENTID,
    };
    await AuthProviderClass.#generateAuthToken(body);
  };

  refreshAuthToken = async (refreshToken: string) => {
    if (!refreshToken) throw new Error("Cannot refresh Authentication");
    const body = {
      grant_type: "refresh_token",
      client_id: import.meta.env.VITE_AUTH_CLIENTID,
      resource: "management_portal_api",
      refresh_token: refreshToken,
    };
    await AuthProviderClass.#generateAuthToken(body);
    initAxiosServices();
    return getCookie("authToken");
  };

  signout = () => {
    setCookie("authToken", "", 0);
    sessionStorage.clear();
    const redirectUrl = `${AuthProviderClass.#signoutUri}?client_id=${
      import.meta.env.VITE_AUTH_CLIENTID
    }&post_logout_redirect_uri=${window.location.origin}${
      import.meta.env.VITE_AUTH_SIGNOUTCALLBACK
    }`;
    return redirectUrl;
  };

  checkAuthentication = async () => {
    if (!this.isAuthenticated) {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        return AuthProvider.signin();
      }
      await AuthProvider.refreshAuthToken(refreshToken);
    }
  };
}

export const AuthProvider = new AuthProviderClass();
