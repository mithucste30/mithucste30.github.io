/// <reference types="vite/client" />

// YAML imports are parsed to JSON objects at build time (see vite.config.ts).
declare module '*.yaml' {
  const value: unknown;
  export default value;
}
declare module '*.yml' {
  const value: unknown;
  export default value;
}
