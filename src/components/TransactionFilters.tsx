import { useFilterStore } from '../store/filterStore';
import { Currency } from '../types/api';

const CURRENCIES: Currency[] = ['USD', 'CAD', 'EUR', 'GBP', 'AUD', 'JPY'];

function TransactionFilters() {
  const {
    amountRange,
    selectedCurrencies,
    direction,
    setAmountRange,
    setSelectedCurrencies,
    setDirection,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-indigo-600 hover:text-indigo-900"
        >
          Reset Filters
        </button>
      </div>

      <div className="space-y-4">
        {/* Amount Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount Range</label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                value={amountRange.min ?? ''}
                onChange={(e) => setAmountRange(e.target.value ? Number(e.target.value) : null, amountRange.max)}
                placeholder="Min"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="number"
                value={amountRange.max ?? ''}
                onChange={(e) => setAmountRange(amountRange.min, e.target.value ? Number(e.target.value) : null)}
                placeholder="Max"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Currencies</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CURRENCIES.map((currency) => (
              <button
                key={currency}
                onClick={() => {
                  if (selectedCurrencies.includes(currency)) {
                    setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currency));
                  } else {
                    setSelectedCurrencies([...selectedCurrencies, currency]);
                  }
                }}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCurrencies.includes(currency)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>

        {/* Direction Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Direction</label>
          <div className="mt-2 flex gap-2">
            {(['all', 'inflow', 'outflow'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => setDirection(dir)}
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                  direction === dir
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {dir.charAt(0).toUpperCase() + dir.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionFilters; 