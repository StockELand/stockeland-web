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
  parsedAt: string;
  status: IParseStatus;
  modifiedCount: number;
  executionTime: number;
  message: string;
}
export type IParseStatus = "success" | "fail";

export interface IPredictionLog {
  id: number;
  predictedAt: string;
  status: IPredictionStatus;
  modifiedCount: number;
  executionTime: number;
  message: string;
}
export type IPredictionStatus = "success" | "fail";

export interface IParseData {
  id: number;
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
  symbol: string;
  volume: number;
}

export interface IPredictionData {
  id: number;
  symbol: string;
  predicted_at: string;
  change_percent: number;
}
