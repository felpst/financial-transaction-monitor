import { create } from 'zustand';
import { Transaction } from '../types/api';

interface TransactionState {
  transactions: Transaction[];
  isConnected: boolean;
  isPaused: boolean;
  error: string | null;
  addTransaction: (transaction: Transaction) => void;
  setConnected: (connected: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  setError: (error: string | null) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  isConnected: false,
  isPaused: false,
  error: null,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions].slice(0, 1000), // Keep last 1000 transactions
    })),
  setConnected: (connected) => set({ isConnected: connected }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setError: (error) => set({ error }),
  clearTransactions: () => set({ transactions: [] }),
})); 