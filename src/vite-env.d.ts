/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AUTH_SIGNINCALLBACK: string;
  readonly VITE_AUTH_AUTHORITY_AUTH_ENDPOINT: string;
  readonly VITE_AUTH_AUTHORITY_TOKEN_ENDPOINT: string;
  readonly VITE_AUTH_AUTHORITY_SIGNOUT_ENDPOINT: string;
}
