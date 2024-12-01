import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Notification } from './components/Notification';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Eagerly load critical components
import { AccountSelector } from './components/AccountSelector';

// Lazy load non-critical components
const AccountDetails = lazy(() => import('./components/AccountDetails'));
const TransactionList = lazy(() => import('./components/TransactionList'));
const TransactionFilters = lazy(() => import('./components/TransactionFilters'));

function LoadingFallback() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <Notification />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              Financial Transaction Monitor
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Press Ctrl/Cmd + / to view keyboard shortcuts
            </p>
          </div>
          
          <div className="mt-6 space-y-6">
            <ErrorBoundary
              fallback={
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-700">Failed to load account selector</p>
                </div>
              }
            >
              <AccountSelector />
            </ErrorBoundary>

            <ErrorBoundary
              fallback={
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-700">Failed to load account details</p>
                </div>
              }
            >
              <Suspense fallback={<LoadingFallback />}>
                <AccountDetails />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary
              fallback={
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-700">Failed to load filters</p>
                </div>
              }
            >
              <Suspense fallback={<LoadingFallback />}>
                <TransactionFilters />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary
              fallback={
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-700">Failed to load transactions</p>
                </div>
              }
            >
              <Suspense fallback={<LoadingFallback />}>
                <TransactionList />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
