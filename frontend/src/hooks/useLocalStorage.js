import { useState, useCallback } from 'react';

/**
 * useLocalStorage — state that persists in localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const val = typeof value === 'function' ? value(stored) : value;
      setStored(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch (err) {
      console.error('useLocalStorage error:', err);
    }
  }, [key, stored]);

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStored(initialValue);
    } catch {}
  }, [key, initialValue]);

  return [stored, setValue, removeValue];
}

export default useLocalStorage;
