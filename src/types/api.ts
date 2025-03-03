export interface IStockPrediction {
  id: number;
  name: string;
  symbol: string;
  changePercent: number;
  prevChangePercent?: number;
  predictedAt: string;
}

export interface IStockPrice {
  id: number;
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
