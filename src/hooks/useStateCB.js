import { useState, useEffect, useRef } from 'react';

export function useStateCB(initialState) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(initialState);

  useEffect(() => {
    if (setState.callback) {
      setState.callback(state);
      setState.callback = null;
    }
  }, [state]);

  function newSetState(newState, callback) {
    if (callback) setState.callback = callback;
    stateRef.current = newState;
    setState(newState);
  }

  function getState() {
    return stateRef.current;
  }

  return [getState, newSetState];
}

export default useStateCB;
