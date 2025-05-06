/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOMAIN_APP: string
  readonly VITE_APP_API_URL: string
  readonly VITE_AUTH_API_URL: string

  readonly VITE_AUTH_AZURE_CLIENT_ID: string
  readonly VITE_AUTH_AZURE_AUTHORITY: string
  readonly VITE_AUTH_AZURE_SCOPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
