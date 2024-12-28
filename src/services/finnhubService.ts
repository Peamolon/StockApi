// src/services/finnhubService.ts
import axios from 'axios';
import { FINNUB_API_KEY } from '../constants/constants';

const BASE_URL = 'https://finnhub.io/api/v1';

interface SearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export const searchSymbols = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query,
        token: FINNUB_API_KEY
      }
    });
    return response.data.result;
  } catch (error) {
    console.error("Error searching symbols:", error);
    return [];
  }
};
