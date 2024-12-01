import { memo, useCallback, useMemo } from 'react';
import { useTransactionWebSocket } from '../hooks/useTransactionWebSocket';
import { useAccountStore } from '../store/accountStore';
import { useFilterStore } from '../store/filterStore';
import { useTransactionStore } from '../store/transactionStore';
import { Transaction } from '../types/api';
import { formatCurrency } from '../utils/formatters';

const TransactionItem = memo(({ transaction }: { transaction: Transaction }) => {
  const isInflow = transaction.direction === 'inflow';
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {isInflow ? transaction.sourceName : transaction.destinationName}
          </h3>
          <p className="text-xs text-gray-500">
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>
        <div className={`text-sm font-medium ${isInflow ? 'text-green-600' : 'text-red-600'}`}>
          {isInflow ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
        </div>
      </div>
    </div>
  );
});

TransactionItem.displayName = 'TransactionItem';

function TransactionList() {
  const selectedAccountId = useAccountStore((state) => state.selectedAccountId);
  const { transactions, isConnected, isPaused } = useTransactionStore();
  const { amountRange, selectedCurrencies, direction } = useFilterStore();
  const { togglePause, clearHistory } = useTransactionWebSocket(selectedAccountId);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Filter by amount range
      if (amountRange.min !== null && transaction.amount < amountRange.min) return false;
      if (amountRange.max !== null && transaction.amount > amountRange.max) return false;

      // Filter by currency
      if (selectedCurrencies.length > 0 && !selectedCurrencies.includes(transaction.currency)) return false;

      // Filter by direction
      if (direction !== 'all' && transaction.direction !== direction) return false;

      return true;
    });
  }, [transactions, amountRange, selectedCurrencies, direction]);

  const handlePauseToggle = useCallback(() => {
    togglePause();
  }, [togglePause]);

  const handleClearHistory = useCallback(() => {
    clearHistory();
  }, [clearHistory]);

  if (!selectedAccountId) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 text-center">Select an account to view transactions</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Transactions</h2>
        <div className="space-x-2">
          <button
            onClick={handlePauseToggle}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isPaused
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={handleClearHistory}
            className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Clear History
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No transactions found</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction.transactionId} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList; 