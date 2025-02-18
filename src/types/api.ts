export interface IStockPrediction {
  id: number;
  name: string;
  symbol: string;
  changePercent: number;
  prevChangePercent?: number;
  predictedAt: string;
}
