/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FARM_DOMAIN_APP: string;
  readonly FARM_APP_API_URL: string;
  readonly FARM_AUTH_API_URL: string;

  readonly FARM_AUTH_API_URL: string;
  readonly FARM_AUTH_AZURE_CLIENT_ID: string;
  readonly FARM_AUTH_AZURE_AUTHORITY: string;
  readonly FARM_AUTH_AZURE_REDIRECT_URI: string;
  readonly FARM_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI: string;
  readonly FARM_AUTH_AZURE_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
