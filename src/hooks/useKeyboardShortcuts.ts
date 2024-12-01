import { useEffect } from 'react';
import { useFilterStore } from '../store/filterStore';
import { useTransactionStore } from '../store/transactionStore';

export function useKeyboardShortcuts() {
  const { isPaused, setIsPaused } = useTransactionStore();
  const { resetFilters } = useFilterStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle keyboard shortcuts if no input element is focused
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      // Ctrl/Cmd + / to show keyboard shortcuts
      if (event.key === '/' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        alert(`
Keyboard Shortcuts:
------------------
Space: Pause/Resume transactions
R: Reset filters
?: Show this help
        `.trim());
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          // Space to toggle pause
          event.preventDefault();
          setIsPaused(!isPaused);
          break;
        case 'r':
          // R to reset filters
          event.preventDefault();
          resetFilters();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused, setIsPaused, resetFilters]);
} 