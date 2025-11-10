export interface StockSignal {
  长线: string;
  波段: string;
  短线: string;
  波段止损?: string;
  波段目标?: string;
  短线止损?: string;
}

export interface Stock {
  code: string;
  name: string;
  price: number;
  pe: number;
  pb: number;
  technical_score: number;
  valuation_score: number;
  news_score: number;
  total_score: number;
  rating: string;
  signals: StockSignal;
}

export interface StockData {
  generated_at: string;
  count: number;
  results: Stock[];
}