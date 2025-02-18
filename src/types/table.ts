export interface IStock {
  symbol: string;
  name: string;
  latestDate: string;
  latestClose: number;
  latestChangePercent: number;
  prevDate: string;
  prevClose: number;
  prevChangePercent: number;
}

export interface IParseLog {
  id: number;
  parsedAt: string;
  status: IParseStatus;
  modifiedCount: number;
  executionTime: number;
  message: string;
  parsedRangeStart: string;
  parsedRangeEnd: string;
  lastDataDate: string;
}
export type IParseStatus = "success" | "fail";

export interface IPredictionLog {
  id: number;
  predictedAt: string;
  status: IPredictionStatus;
  modifiedCount: number;
  executionTime: number;
  message: string;
  lastDataDate: string;
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
  predictedAt: string;
  changePercent: number;
}
