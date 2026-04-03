/// <reference types="react" />
/// <reference types="react-dom" />

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
