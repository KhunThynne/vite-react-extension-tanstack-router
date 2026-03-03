/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_CLIENT_DB_NAME: string;
  readonly VITE_CLIENT_DB_VERSION: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
