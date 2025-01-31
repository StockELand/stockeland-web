export interface IStock {
  ticker: string; // 종목 코드 (예: AAPL)
  name: string; // 회사 이름
  previous_close: number; // 전날 종가
  today_close: number; // 오늘 종가
  previous_prediction_error: number; // 전날 예측 오차
  today_prediction_percent: number; // 오늘 예측 퍼센트
}
