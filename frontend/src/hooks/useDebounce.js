import { useState, useCallback, useRef } from 'react';

/**
 * Debounced search hook
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timer = useRef(null);

  const set = useCallback(
    (val) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDebouncedValue(val), delay);
    },
    [delay]
  );

  return [debouncedValue, set];
}
