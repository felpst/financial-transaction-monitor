import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account } from '../types/api';

interface AccountState {
  accounts: Account[];
  selectedAccountId: string | null;
  isLoading: boolean;
  error: string | null;
  setAccounts: (accounts: Account[]) => void;
  setSelectedAccountId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accounts: [],
      selectedAccountId: null,
      isLoading: false,
      error: null,
      setAccounts: (accounts) => set({ accounts }),
      setSelectedAccountId: (id) => set({ selectedAccountId: id }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'account-storage',
    }
  )
); 