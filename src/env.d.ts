/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_APP_BASE_PATH: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
