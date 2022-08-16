export default {};

export interface WebJob {
  latest_run?: WebJobRun;
  history_url: string;
  scheduler_logs_url?: string;
  name: string;
  run_command: string;
  url: string;
  extra_info_url: string;
  type: string;
  using_sdk: boolean;
}

export interface WebJobRun {
  id: string | number;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  duration: string;
  output_url: string;
  error_url?: string;
  url: string;
  job_name: string;
  trigger: string;
}

export interface WebJobGetListDTO {
  refresh?: boolean;
}
