
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TRIGGERED_WEBJOBS_API_BASE_URL: string;
}
/// <reference types="vite/client" />
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface __APP_ENV__ {
  [key: string]: string | undefined;
}
