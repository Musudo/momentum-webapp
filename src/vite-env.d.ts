/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_ENABLE_DEBUG: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_AUTH_SIGN_IN_URL: string;
}