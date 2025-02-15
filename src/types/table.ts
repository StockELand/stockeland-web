export interface IStock {
  symbol: string;
  name: string;
  latest_date: string;
  latest_close: number;
  latest_change_percent: number;
  prev_date: string;
  prev_close: number;
  prev_change_percent: number;
}

export interface IParseLog {
  id: number;
  parsed_at: string;
  status: IParseStatus;
  modified_count: number;
  execution_time: number;
  message: string;
}
export type IParseStatus = "success" | "fail";
