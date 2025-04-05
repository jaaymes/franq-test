import type { FinanceResponse } from '@/interfaces/finance';

import { apiFinance } from './api-finance';

// Cache para armazenar os dados da API por um período determinado
let cachedData: FinanceResponse | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

export const getFinance = async (): Promise<FinanceResponse> => {
  const now = Date.now();

  // Verificar se temos dados em cache válidos
  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const response = await apiFinance.get('/finance');

    if (response.status !== 200) {
      throw new Error('Erro ao buscar dados financeiros');
    }

    // Armazenar os novos dados no cache
    cachedData = response.data;
    cacheTimestamp = now;

    return response.data;
  } catch (error) {
    // Se houver erro mas tivermos dados em cache, retornamos o cache mesmo expirado
    if (cachedData) {
      console.warn('Erro ao atualizar dados financeiros, usando cache expirado', error);
      return cachedData;
    }
    throw error;
  }
};
