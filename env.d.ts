interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TRIGGERED_WEBJOBS_API_BASE_URL: string;
  readonly VITE_BASIC_AUTH_USERNAME: string;
  readonly VITE_BASIC_AUTH_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}