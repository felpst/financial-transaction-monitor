import { Transaction } from '../types/api';

const BASE_WS_URL = 'wss://paloma-financial-auditor-0aff70148dbe.herokuapp.com';

export interface WebSocketOptions {
  onMessage: (transaction: Transaction) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
  onOpen?: () => void;
}

export class TransactionWebSocket {
  private ws: WebSocket | null = null;
  private accountId: string;
  private options: WebSocketOptions;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private shouldReconnect = true;

  constructor(accountId: string, options: WebSocketOptions) {
    this.accountId = accountId;
    this.options = options;
  }

  connect(sinceTransactionId?: string): void {
    const url = new URL(`${BASE_WS_URL}/accounts/${this.accountId}/transactions`);
    if (sinceTransactionId) {
      url.searchParams.append('since', sinceTransactionId);
    }

    this.ws = new WebSocket(url.toString());
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      try {
        const transaction: Transaction = JSON.parse(event.data);
        this.options.onMessage(transaction);
      } catch (error) {
        this.options.onError?.(new Error('Failed to parse transaction data'));
      }
    };

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
      this.options.onOpen?.();
    };

    this.ws.onclose = () => {
      this.options.onClose?.();
      this.handleReconnect();
    };

    this.ws.onerror = () => {
      this.options.onError?.(new Error('WebSocket error occurred'));
    };
  }

  private handleReconnect(): void {
    if (!this.shouldReconnect || this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.options.onError?.(new Error('Max reconnection attempts reached'));
      return;
    }

    setTimeout(() => {
      this.reconnectAttempts++;
      this.reconnectDelay *= 2; // Exponential backoff
      this.connect();
    }, this.reconnectDelay);
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
} 