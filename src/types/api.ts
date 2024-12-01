export type Currency = "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";

export interface Account {
  accountId: string;
  accountName: string;
  currency: Currency;
  country: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface AccountResponse {
  data: Account[] | null;
  error: string | null;
}

export interface Transaction {
  transactionId: string;
  timestamp: string;
  direction: "inflow" | "outflow";
  amount: number;
  currency: Currency;
  destinationId: string;
  destinationName: string;
  sourceId: string;
  sourceName: string;
}

export interface ApiError {
  data: null;
  error: string;
} 