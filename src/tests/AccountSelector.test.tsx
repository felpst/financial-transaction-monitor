import { AccountSelector } from '../components/AccountSelector';
import { fetchAccounts } from '../services/api';
import { Account } from '../types/api';
import { render, screen, waitFor } from './testUtils';

// Mock the API module
jest.mock('../services/api');
const mockFetchAccounts = fetchAccounts as jest.MockedFunction<typeof fetchAccounts>;

const mockAccounts: Account[] = [
  {
    accountId: '1',
    accountName: 'Test Account 1',
    currency: 'USD',
    country: 'US',
    address: '123 Test St',
    phoneNumber: '123-456-7890',
    email: 'test1@example.com',
  },
  {
    accountId: '2',
    accountName: 'Test Account 2',
    currency: 'EUR',
    country: 'FR',
    address: '456 Test Ave',
    phoneNumber: '098-765-4321',
    email: 'test2@example.com',
  },
];

describe('AccountSelector', () => {
  beforeEach(() => {
    mockFetchAccounts.mockReset();
  });

  it('shows loading state while fetching accounts', async () => {
    mockFetchAccounts.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockAccounts), 100))
    );

    render(<AccountSelector />);
    
    const button = screen.getByRole('button', { name: /select an account/i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('heading', { name: /account/i })).toBeInTheDocument();
  });

  it('displays accounts after loading', async () => {
    mockFetchAccounts.mockResolvedValue(mockAccounts);

    render(<AccountSelector />);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /select an account/i });
      expect(button).not.toBeDisabled();
    });

    expect(screen.getByText('Select an account')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    const errorMessage = 'Failed to fetch accounts';
    mockFetchAccounts.mockRejectedValue(new Error(errorMessage));

    render(<AccountSelector />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 