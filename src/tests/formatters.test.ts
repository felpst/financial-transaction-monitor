import { formatCurrency } from '../utils/formatters';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
    expect(formatCurrency(-1234.56, 'USD')).toBe('-$1,234.56');
  });

  it('formats EUR correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    expect(formatCurrency(0, 'EUR')).toBe('€0.00');
    expect(formatCurrency(-1234.56, 'EUR')).toBe('-€1,234.56');
  });

  it('formats JPY correctly', () => {
    expect(formatCurrency(1234, 'JPY')).toBe('¥1,234');
    expect(formatCurrency(0, 'JPY')).toBe('¥0');
    expect(formatCurrency(-1234, 'JPY')).toBe('-¥1,234');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000.00');
    expect(formatCurrency(1000000, 'EUR')).toBe('€1,000,000.00');
    expect(formatCurrency(1000000, 'JPY')).toBe('¥1,000,000');
  });
}); 