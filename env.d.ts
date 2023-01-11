
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TRIGGERED_WEBJOBS_API_BASE_URL: string;
  readonly VITE_WEBJOBS_BASIC_AUTH_USERNAME: string;
  readonly VITE_WEBJOBS_BASIC_AUTH_PASSWORD: string;
  readonly VITE_ETL_API_BASE_URL: string;
  readonly VITE_EVALUATE_API_KEY: string;
  readonly VITE_EVALUATE_ORIGIN_URL: string;
  readonly VITE_AZURE_STORAGE_PREFIX: string;
  readonly VITE_AAD_CLIENT_ID: string;
  readonly VITE_AAD_CLOUD_INSTANCE: string;
  readonly VITE_AAD_LOGOUT_REDIRECT_URI: string;
}
/// <reference types="vite/client" />
interface ImportMeta {
  readonly env: ImportMetaEnv;
}