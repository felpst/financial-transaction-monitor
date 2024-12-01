import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency } from '../types/api';

interface FilterState {
  amountRange: {
    min: number | null;
    max: number | null;
  };
  selectedCurrencies: Currency[];
  direction: 'all' | 'inflow' | 'outflow';
  setAmountRange: (min: number | null, max: number | null) => void;
  setSelectedCurrencies: (currencies: Currency[]) => void;
  setDirection: (direction: 'all' | 'inflow' | 'outflow') => void;
  resetFilters: () => void;
}

const initialState = {
  amountRange: {
    min: null,
    max: null,
  },
  selectedCurrencies: [],
  direction: 'all' as const,
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      ...initialState,
      setAmountRange: (min, max) =>
        set((state) => ({
          ...state,
          amountRange: { min, max },
        })),
      setSelectedCurrencies: (currencies) =>
        set((state) => ({
          ...state,
          selectedCurrencies: currencies,
        })),
      setDirection: (direction) =>
        set((state) => ({
          ...state,
          direction,
        })),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'transaction-filters',
    }
  )
); 