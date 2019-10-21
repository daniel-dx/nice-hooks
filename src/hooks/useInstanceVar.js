import { useRef } from 'react';

export function useInstanceVar(initialValue) {
  const instRef = useRef(initialValue);

  function getVal() {
    return instRef.current;
  }

  function setVal(val) {
    instRef.current = val;
  }

  return [getVal, setVal];
}
