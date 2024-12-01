import { Account, AccountResponse } from '../types/api';

const BASE_URL = 'https://paloma-financial-auditor-0aff70148dbe.herokuapp.com';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchAccounts = async (): Promise<Account[]> => {
  try {
    const response = await fetch(`${BASE_URL}/accounts`);
    const data: AccountResponse = await response.json();
    
    if (data.error) {
      throw new ApiError(data.error);
    }
    
    if (!data.data) {
      throw new ApiError('No data received from server');
    }
    
    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch accounts');
  }
}; 