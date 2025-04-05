import axios from 'axios';

export const apiFinance = axios.create({
  baseURL: API_FINANCE,
  params: {
    key: FINANCE_KEY,
    format: 'json-cors',
  },
});
