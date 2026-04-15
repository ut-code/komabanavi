/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_POSITION?: string;
  readonly VITE_CONVEX_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg" {
  const url: string;
  export default url;
}

declare module "*.avif" {
  const url: string;
  export default url;
}

declare module "*.css" {
  const css: string;
  export default css;
}
