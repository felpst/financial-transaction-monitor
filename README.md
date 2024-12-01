# Financial Transaction Monitor

A real-time financial transaction monitoring tool built with React and TypeScript. This application allows staff members to monitor live transactions from accounts worldwide, with features for filtering and analyzing transaction activities.

## Features

- 🔄 Real-time transaction monitoring with WebSocket connection
- 📊 Advanced filtering by amount, currency, and direction
- ⏯️ Pause/resume functionality for transaction stream
- 🎯 Account selection and detailed view
- ⌨️ Keyboard shortcuts for common actions
- 🌙 Clean, modern UI with responsive design
- 🛡️ Comprehensive error handling and recovery
- 🚀 Performance optimized with code splitting and memoization

## Tech Stack

- **Frontend Framework**: React.js with TypeScript
- **Styling**: TailwindCSS + HeadlessUI
- **State Management**: Zustand
- **Testing**: Jest + React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone git@github.com:felpst/financial-transaction-monitor.git
cd financial-transaction-monitor
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

The application will be available at `http://localhost:5173`.

## Usage

### Keyboard Shortcuts

- `Space`: Pause/Resume transaction stream
- `R`: Reset filters
- `Ctrl/Cmd + /`: Show keyboard shortcuts help

### Account Selection

1. Choose an account from the dropdown menu
2. View account details in the details panel
3. Monitor real-time transactions in the transaction list

### Transaction Filtering

- Filter by amount range
- Filter by specific currencies
- Filter by transaction direction (inflow/outflow)
- Reset filters using the "Reset Filters" button or `R` key

## Project Structure

```
src/
├── components/        # React components
│   ├── shared/       # Reusable components
│   └── ...
├── hooks/            # Custom React hooks
├── services/         # API and WebSocket services
├── store/           # Zustand stores
├── types/           # TypeScript types
├── utils/           # Utility functions
└── tests/           # Test files
```

## Discussion

### Technology Choices

I chose React with TypeScript as the foundation for its robust type safety and excellent developer experience. For styling, TailwindCSS was selected for its utility-first approach, which allows for rapid UI development without context switching between files. HeadlessUI provides accessible components while maintaining full styling control.

Zustand was chosen over Redux or Context API for state management because it offers a simpler API with less boilerplate while still providing powerful features like state persistence and devtools integration. Its small bundle size and straightforward integration with TypeScript made it an excellent choice for this project.

For real-time updates, native WebSocket was used instead of Socket.IO or other libraries to minimize dependencies and maintain better control over the connection lifecycle, including reconnection logic and error handling.

### Areas for Improvement

With more time, I would focus on the following improvements:

1. **Performance Optimization**:
   - Implement virtual scrolling for large transaction lists
   - Add service worker for offline support
   - Implement more aggressive data cleanup for long sessions

2. **Feature Enhancements**:
   - Add transaction search functionality
   - Implement data export features
   - Add more advanced filtering options (date range, amount patterns)
   - Create transaction detail view with more information

3. **Testing and Documentation**:
   - Add end-to-end tests with Cypress
   - Improve test coverage
   - Add Storybook for component documentation
   - Create API documentation with OpenAPI/Swagger

### Proud Achievements

I'm particularly proud of several aspects of this solution:

1. **Robust Error Handling**: The application implements comprehensive error boundaries and recovery mechanisms, ensuring a smooth user experience even when things go wrong.

2. **Performance Optimization**: The implementation of code splitting, component memoization, and efficient state management results in a snappy and responsive application even with frequent real-time updates.

3. **User Experience**: The combination of keyboard shortcuts, intuitive filtering, and smooth animations creates a pleasant and efficient user experience. The ability to pause and resume the transaction stream gives users better control over their monitoring workflow.

4. **Code Quality**: The codebase maintains high standards with TypeScript, proper testing, and clean architecture. The modular structure and clear separation of concerns make it easy to maintain and extend.

## License

This project is licensed under the MIT License.
