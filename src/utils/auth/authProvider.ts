import {setCookie} from "../cookies.ts";

class AuthProviderClass {
    static #signInUri = `${window.location.origin}${import.meta.env.VITE_AUTH_SIGNIN_URL}`;

    constructor() {
    }

    get isAuthenticated() {
        return !!this.authToken;
    }

    get authToken(): string | undefined {
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
            return undefined;
        }
        return authToken;
    }

    checkAuthentication = (): string | undefined => {
        if (!this.isAuthenticated) {
            // Return the current location if authenticated
            return window.location.href;
        }
    };

    // TODO: maybe work this out in the future
    signIn = (): string| undefined => {
        return undefined;
    };

    signOut = (): string => {
        setCookie("authToken", "", 0);
        sessionStorage.removeItem("authToken");
        return AuthProviderClass.#signInUri;
    };
}

export const AuthProvider = new AuthProviderClass();
