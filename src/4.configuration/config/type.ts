export enum Environment {
  LOCAL = 'LOCAL',
  DEV = 'DEV',
  STG = 'STG',
  PRD = 'PRD',
}

export type Config = {
  FIREBASE_API_SERVICE_ACCOUNT: string;
};
