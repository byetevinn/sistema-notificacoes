export const STATUS = {
  WAITING: 'WAITING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
