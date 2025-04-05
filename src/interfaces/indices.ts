export interface MarketIndex {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  color?: string;
}

export interface IndexHistory {
  date: string;
  value: number;
  volume?: number;
}

export interface IndexDetails {
  symbol: string;
  name?: string;
  current: number;
  open?: number;
  high?: number;
  low?: number;
  marketClosed?: boolean;
  history: IndexHistory[];
  volumeData?: IndexHistory[];
}
