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
