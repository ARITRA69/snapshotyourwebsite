export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_SERVER_URL: string;
      MONGODB_DATABASE_NAME: string;
      NEXT_PUBLIC_RENDER_URL: string;
    }
  }
}

