export default {}

export interface TriggerRequestDto {
  code: string;
  date: string
}

export interface TriggerLogs {
  uuid: string,
  username: string,
  datetime: string,
  company_code: string,
  start_date_requested: string
  webjob_type: string,
  status: TriggerStatus,
  remarks?: string
}

export enum TriggerStatus {
  start = 'start',
  pending = 'pending',
  failed = 'failed'
}

export interface GetLogsDto {
  containerName: string;
  fileName: string;
}