import { useEffect, useRef } from 'react';
import { useNotificationStore } from '../components/Notification';
import { TransactionWebSocket } from '../services/websocket';
import { useTransactionStore } from '../store/transactionStore';

export const useTransactionWebSocket = (accountId: string | null) => {
  const wsRef = useRef<TransactionWebSocket | null>(null);
  const {
    addTransaction,
    setConnected,
    setIsPaused,
    setError,
    clearTransactions,
    isPaused,
  } = useTransactionStore();
  const { show } = useNotificationStore();

  useEffect(() => {
    if (!accountId || isPaused) {
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
        setConnected(false);
      }
      return;
    }

    wsRef.current = new TransactionWebSocket(accountId, {
      onMessage: (transaction) => {
        addTransaction(transaction);
      },
      onOpen: () => {
        setConnected(true);
        setError(null);
        show('Connected to transaction stream', 'success');
      },
      onClose: () => {
        setConnected(false);
        show('Disconnected from transaction stream', 'info');
      },
      onError: (error) => {
        setError(error.message);
        show(error.message, 'error');
      },
    });

    wsRef.current.connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
        setConnected(false);
      }
    };
  }, [accountId, isPaused, show, addTransaction, setConnected, setError]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    show(
      isPaused ? 'Resuming transaction stream' : 'Pausing transaction stream',
      'info'
    );
  };

  const clearHistory = () => {
    clearTransactions();
    show('Transaction history cleared', 'info');
  };

  return {
    togglePause,
    clearHistory,
  };
}; 