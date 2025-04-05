export interface Currency {
  name: string;
  code?: string;
  buy: number | null;
  sell: number | null;
  variation: number;
}

export interface Stock {
  name: string;
  location: string;
  points: number;
  variation: number;
}

export interface BitcoinExchange {
  name: string;
  format: [string, string];
  last: number;
  buy?: number;
  sell?: number;
  variation: number;
}

export interface Tax {
  date: string;
  cdi: number;
  selic: number;
  daily_factor: number;
  selic_daily: number;
  cdi_daily: number;
}

interface FinanceResponse {
  by: string;
  valid_key: boolean;
  results: {
    currencies: {
      source: string;
      [key: string]: Currency | string;
    };
    stocks: {
      [key: string]: Stock;
    };
    available_sources: string[];
    bitcoin: {
      [key: string]: BitcoinExchange;
    };
    taxes: Tax[];
  };
  execution_time: number;
  from_cache: boolean;
}

export type { FinanceResponse };
