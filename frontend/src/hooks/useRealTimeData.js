import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useRealTimeData — simulates live data polling
 * @param {Function} fetchFn - function returning fresh data
 * @param {number} interval - ms between updates (default 5000)
 * @param {boolean} immediate - fetch immediately on mount
 */
export function useRealTimeData(fetchFn, interval = 5000, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [lastUpdated, setLastUpdated] = useState(null);
  const timerRef = useRef(null);

  const refresh = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Real-time fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (immediate) refresh();
    timerRef.current = setInterval(refresh, interval);
    return () => clearInterval(timerRef.current);
  }, [refresh, interval, immediate]);

  return { data, loading, lastUpdated, refresh };
}

/**
 * useCountUp — animates a number from 0 to target
 */
export function useCountUp(target, duration = 1500, start = true) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let count = 0;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(count));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [target, duration, start]);

  return current;
}

/**
 * useDebounce — debounces a value
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/**
 * usePrevious — returns the previous value of a state
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

/**
 * useInterval — declarative setInterval
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/**
 * useToggle — boolean toggle helper
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue  = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, { toggle, setTrue, setFalse }];
}
