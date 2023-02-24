declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly OPEN_WHEATHER_MAP_API_URL: string
  readonly OPEN_WHEATHER_MAP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}