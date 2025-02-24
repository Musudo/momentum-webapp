import {setCookie} from "../cookies.ts";

class AuthProviderClass {
    static #signInUri = `${window.location.origin}${import.meta.env.VITE_AUTH_SIGNIN_URL}`;
    static TOKEN_EXPIRY = 10 * 60 * 60 * 1000;

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

        const tokenTimestamp = sessionStorage.getItem("authTokenTimestamp");
        if (!tokenTimestamp) {
            // If there's no timestamp, clear the token to be safe
            this.signOut();
            return undefined;
        }

        const tokenTime = Number(tokenTimestamp);
        // Check if the token is older than 10 hours
        if (Date.now() - tokenTime > AuthProviderClass.TOKEN_EXPIRY) {
            // Token expired: clear it
            this.signOut();
            return undefined;
        }

        return authToken;
    }

    storeToken(token: string) {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("authTokenTimestamp", Date.now().toString());
    }

    checkAuthentication = (): string | undefined => {
        // Prevent redirect loop by not checking if already on the sign-in page.
        if (window.location.pathname === '/signIn') {
            return undefined;
        }

        if (!this.isAuthenticated) {
            // Build a relative returnUrl so it doesn't include the origin
            const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
            return `${AuthProviderClass.#signInUri}?returnUrl=${returnUrl}`;
        }
    };

    // TODO: maybe work this out in the future
    signIn = (): string | undefined => {
        return undefined;
    };

    signOut = (): string => {
        setCookie("authToken", "", 0);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authTokenTimestamp");
        return AuthProviderClass.#signInUri;
    };
}

export const AuthProvider = new AuthProviderClass();
