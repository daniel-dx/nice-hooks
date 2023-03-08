import { useRef } from 'react';

export function useSingleInstanceVar(initialValue) {
  const instRef = useRef(initialValue);
  const returnVal = useRef({ ...initialValue }).current;

  if (!returnVal._definedProperty) {
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
    returnVal._definedProperty = true;
  }

  return returnVal;
}

export default useSingleInstanceVar;
