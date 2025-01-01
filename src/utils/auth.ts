import { createAuthProvider } from "@signpost-hardware/auth-provider";

export const Authentication = createAuthProvider({
  clientId: import.meta.env.VITE_AUTH_CLIENTID,
  resource: import.meta.env.VITE_AUTH_RESOURCE,
  redirectUri: `${window.location.origin}${
    import.meta.env.VITE_AUTH_SIGNINCALLBACK
  }`,
  authUri: `${import.meta.env.VITE_AUTH_AUTHORITY}${
    import.meta.env.VITE_AUTH_AUTHORITY_AUTH_ENDPOINT
  }`,
  signoutUri: `${import.meta.env.VITE_AUTH_AUTHORITY}${
    import.meta.env.VITE_AUTH_AUTHORITY_SIGNOUT_ENDPOINT
  }`,
  tokenUri: `${import.meta.env.VITE_AUTH_AUTHORITY}${
    import.meta.env.VITE_AUTH_AUTHORITY_TOKEN_ENDPOINT
  }`,
  scopes: import.meta.env.VITE_AUTH_CLIENTSCOPES,
});
