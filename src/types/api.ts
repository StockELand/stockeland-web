export interface IStockPrediction {
  id: number;
  name: string;
  symbol: string;
  change_percent: number;
  prev_change_percent?: number;
  predicted_at: string;
}
