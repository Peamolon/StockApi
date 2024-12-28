export interface StockPrice {
  date: string;
  price: number;
}

export interface StockInfo {
  symbol: string;
  prices: StockPrice[];
}