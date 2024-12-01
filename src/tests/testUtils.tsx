import { render as rtlRender } from '@testing-library/react';
import { ReactElement } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

function render(ui: ReactElement) {
  return rtlRender(
    <ErrorBoundary>
      {ui}
    </ErrorBoundary>
  );
}

// Re-export everything
export * from '@testing-library/react';
export { render };
