export enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PRD = 'prd',
}

export type Config = {
  FIREBASE_API_SERVICE_ACCOUNT: string;
  JSON_WEB_TOKEN_SECRET_KEY: string;
};
