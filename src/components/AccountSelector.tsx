import { useEffect } from 'react';
import { fetchAccounts } from '../services/api';
import { useAccountStore } from '../store/accountStore';
import { Account } from '../types/api';
import { Dropdown } from './shared/Dropdown';

export function AccountSelector() {
  const {
    accounts,
    selectedAccountId,
    setAccounts,
    setSelectedAccountId,
    setLoading,
    setError,
    isLoading,
    error
  } = useAccountStore();

  useEffect(() => {
    const loadAccounts = async () => {
      setLoading(true);
      try {
        const fetchedAccounts = await fetchAccounts();
        setAccounts(fetchedAccounts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const selectedAccount = accounts.find(acc => acc.accountId === selectedAccountId);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Account</h2>
      <div className="relative">
        <Dropdown<Account>
          id="account-select"
          value={selectedAccount || null}
          onChange={(account: Account) => setSelectedAccountId(account.accountId)}
          options={accounts}
          getLabel={(account: Account) => account.accountName}
          getValue={(account: Account) => account.accountId}
          placeholder="Select an account"
          disabled={isLoading}
          className="w-full"
        />
        {isLoading && (
          <div className="absolute right-10 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
} 