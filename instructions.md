# Financial Transaction Monitor - Development Documentation

## API Reference

### Base URL
```
https://paloma-financial-auditor-0aff70148dbe.herokuapp.com
```

### Endpoints

#### 1. Get Accounts
```
GET /accounts
```

Returns a list of all accounts in the system.

**Response Type:**
```typescript
type AccountResponse = 
  | {
      data: Array<{
        accountId: string;
        accountName: string;
        currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
        country: string;
        address: string;
        phoneNumber: string;
        email: string;
      }>;
      error: null;
    }
  | {
      data: null;
      error: string;
    };
```

**Responses:**

- 200: Success Example
```json
{
  "data": [
    {
      "accountId": "7059ef6a-0e25-5db3-a16f-02a8fc34cffe",
      "accountName": "Vivian Jenkins",
      "currency": "EUR",
      "country": "Morocco",
      "address": "765 Chadrick Springs, Overland Park 1639, Botswana",
      "phoneNumber": "+764397271050211",
      "email": "Kennedy.Cole57724@email.local"
    }
  ],
  "error": null
}
```

- 500: Internal Server Error Example
```json
{
  "data": null,
  "error": "Something went wrong"
}
```

#### 2. Transaction WebSocket Stream
```
WebSocket /accounts/:accountId/transactions?since=:transactionId
```

Establishes a WebSocket connection for real-time transaction updates.

**Parameters:**
- `accountId` (path parameter): Account ID to monitor
  - Invalid accountId will trigger connection handshake error
- `since` (query parameter, optional): Transaction ID to start streaming from

**Transaction Message Type:**
```typescript
type Transaction = {
  transactionId: string;
  direction: "inflow" | "outflow";
  amount: number;
  currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
  destinationId: string;
  destinationName: string;
  sourceId: string;
  sourceName: string;
};
```

**Example Message:**
```json
{
  "transactionId": "00c31497-a3a1-5f7d-893f-114431f0ba77",
  "timestamp": "2024-07-29T23:39:29.636Z",
  "direction": "outflow",
  "amount": 2873,
  "currency": "JPY",
  "destinationId": "00c31497-a3a1-5f7d-893f-114431f0ba77",
  "destinationName": "Kaleigh Crist",
  "sourceId": "22d47378-a85d-5d75-a3a8-86cb61eb3a0e",
  "sourceName": "Gunner Kassulke"
}
```

**Important Notes:**
- The WebSocket connection may be unexpectedly closed by the server due to internal processing errors
- Implement appropriate reconnection logic
- Handle connection errors gracefully

## Overview
This document outlines the development process for creating a real-time financial transaction monitoring tool. The application allows staff members to monitor live transactions from accounts worldwide, with features for filtering and analyzing suspicious activities.

## Tech Stack
- **Frontend Framework**: React.js with TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **API Management**: React Query
- **WebSocket**: react-use-websocket
- **Testing**: Jest + React Testing Library

## Development Phases

### Phase 1: Project Setup and Basic Structure

1. Initialize project:
   - Create new React TypeScript project using Vite
   - Install and configure TailwindCSS
   - Set up ESLint and Prettier
   - Configure Jest and React Testing Library

2. Create basic project structure:
   ```
   src/
   ├── components/
   ├── hooks/
   ├── services/
   ├── types/
   ├── store/
   ├── utils/
   └── tests/
   ```

3. Define TypeScript interfaces based on API specifications
   - Create account and transaction interfaces
   - Define API response types
   - Set up WebSocket message types

### Phase 2: Core Services Implementation

1. Create API service layer:
   - Implement accounts API service
   - Create WebSocket connection service
   - Add error handling utilities
   - Implement retry mechanisms for failed connections

2. Set up state management:
   - Create Zustand store for account selection
   - Implement transaction cache store
   - Add filter state management
   - Create persistence layer for page refresh retention

### Phase 3: Component Development - Account Selection

1. Create account selection components:
   - Implement account dropdown
   - Create account details display
   - Add loading states
   - Implement error handling UI

2. Develop account details section:
   - Create account information display
   - Add skeleton loading states
   - Implement error boundaries

### Phase 4: Transaction Management 

1. Implement transaction handling:
   - Create WebSocket connection management
   - Implement transaction storage and caching
   - Add real-time update handling
   - Create pause/resume functionality

2. Develop transaction display:
   - Create transaction list component
   - Implement virtual scrolling for performance
   - Add transaction item components
   - Create loading and error states

### Phase 5: Filtering System

1. Create filter components:
   - Implement amount range filter
   - Create currency selection filter
   - Add filter reset functionality
   - Implement filter persistence

2. Develop filter logic:
   - Create filter application system
   - Implement real-time filtering
   - Add filter state preservation
   - Create filter validation

### Phase 6: Error Handling and User Feedback

1. Implement error handling:
   - Create error boundary components
   - Add network error handling
   - Implement user input validation
   - Create error message components

2. Add user feedback:
   - Implement loading states
   - Add success notifications
   - Create connection status indicators
   - Implement progress indicators

### Phase 7: Testing and Documentation

1. Implement testing:
   - Add unit tests for components
   - Create integration tests
   - Implement WebSocket mocking
   - Add filter logic tests

2. Create documentation:
   - Add setup instructions
   - Create component documentation
   - Document state management
   - Add troubleshooting guide

### Phase 8: Performance Optimization

1. Optimize performance:
   - Implement component memoization
   - Add lazy loading
   - Optimize WebSocket handling
   - Implement efficient filtering

2. Add final polishing:
   - Add animations and transitions
   - Implement keyboard shortcuts
   - Add accessibility features
   - Optimize bundle size

## Development Guidelines

### Code Organization
- Keep components small and focused
- Use custom hooks for complex logic
- Implement proper TypeScript typing
- Follow React best practices

### State Management
- Use Zustand for global state
- Implement local state for component-specific data
- Cache API responses appropriately
- Handle WebSocket state carefully

### Error Handling
- Implement proper error boundaries
- Add retry mechanisms for failed requests
- Show user-friendly error messages
- Log errors appropriately

### Performance Considerations
- Implement proper memoization
- Use virtual scrolling for long lists
- Optimize WebSocket connection handling
- Implement efficient filtering

### Testing Requirements
- Write unit tests for all components
- Add integration tests for critical flows
- Test WebSocket functionality
- Verify filter functionality