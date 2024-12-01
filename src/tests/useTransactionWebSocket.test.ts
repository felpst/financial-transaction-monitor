import { act, renderHook } from '@testing-library/react';
import { useTransactionWebSocket } from '../hooks/useTransactionWebSocket';
import { TransactionWebSocket, WebSocketOptions } from '../services/websocket';

// Mock the WebSocket class
jest.mock('../services/websocket');

class MockWebSocket {
  connect = jest.fn();
  disconnect = jest.fn();
  ws = null;
  accountId = '';
  options = {} as WebSocketOptions;
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  reconnectDelay = 1000;
  shouldReconnect = true;

  constructor(accountId: string, options: WebSocketOptions) {
    this.accountId = accountId;
    this.options = options;
  }
}

// Override the mock with our implementation
(TransactionWebSocket as jest.Mock).mockImplementation((accountId, options) => {
  return new MockWebSocket(accountId, options);
});

describe('useTransactionWebSocket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates WebSocket connection when accountId is provided', () => {
    const accountId = 'test-account';
    renderHook(() => useTransactionWebSocket(accountId));

    expect(TransactionWebSocket).toHaveBeenCalledWith(
      accountId,
      expect.any(Object)
    );
    expect((TransactionWebSocket as jest.Mock).mock.results[0].value.connect).toHaveBeenCalled();
  });

  it('does not create WebSocket connection when accountId is null', () => {
    renderHook(() => useTransactionWebSocket(null));
    expect(TransactionWebSocket).not.toHaveBeenCalled();
  });

  it('disconnects when component unmounts', () => {
    const accountId = 'test-account';
    const { unmount } = renderHook(() => useTransactionWebSocket(accountId));
    
    const mockInstance = (TransactionWebSocket as jest.Mock).mock.results[0].value;
    unmount();
    expect(mockInstance.disconnect).toHaveBeenCalled();
  });

  it('provides togglePause and clearHistory functions', () => {
    const { result } = renderHook(() => useTransactionWebSocket('test-account'));

    expect(result.current.togglePause).toBeInstanceOf(Function);
    expect(result.current.clearHistory).toBeInstanceOf(Function);
  });

  it('handles pause/resume correctly', () => {
    const { result } = renderHook(() => useTransactionWebSocket('test-account'));
    const mockInstance = (TransactionWebSocket as jest.Mock).mock.results[0].value;

    act(() => {
      result.current.togglePause();
    });

    expect(mockInstance.disconnect).toHaveBeenCalled();
  });
}); 