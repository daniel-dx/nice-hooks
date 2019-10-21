import { useEffect, useRef } from 'react';

export function useSingleInstanceVar(initialValue) {
  const instRef = useRef(initialValue);
  const returnVal = useRef({ ...initialValue }).current;

  useEffect(function() {
    Object.keys(returnVal).forEach(key => {
      if (key) {
        Object.defineProperty(returnVal, key, {
          get() {
            return instRef.current[key];
          },
          set(val) {
            instRef.current = { ...instRef.current, [key]: val };
          },
        });
      }
    });
  }, []);

  return returnVal;
}

export default useSingleInstanceVar;
