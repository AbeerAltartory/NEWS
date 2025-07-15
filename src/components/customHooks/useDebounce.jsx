import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value (e.g., for search).
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - Debounce delay in ms (default: 500ms)
 * @returns {*} - Debounced value
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value changes before delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
