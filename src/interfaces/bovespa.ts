export interface FinanceDataPoint {
  points: number;
  change: number;
  date: string;
}

export interface StockMarketData {
  date: string;
  close: number;
  high: number;
  low: number;
  last: number;
  volume: number;
  change_percent: number;
  previous_date: string;
  previous_close: number;
  data: FinanceDataPoint[];
}

export interface FinanceApiResponse {
  by: string;
  valid_key: boolean;
  results: StockMarketData[];
  execution_time: number;
  from_cache: boolean;
}
