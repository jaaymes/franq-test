import type { FinanceApiResponse, StockMarketData } from '@/interfaces/bovespa';
import { apiFinance } from './api-finance';

export const getBovespaDaily = async (params: {
  days_ago?: number | null;
  start_date?: string;
  end_date?: string;
}): Promise<StockMarketData[]> => {
  const response = await apiFinance.get<FinanceApiResponse>('/finance/ibovespa', {
    params,
  });

  return response.data.results;
};
