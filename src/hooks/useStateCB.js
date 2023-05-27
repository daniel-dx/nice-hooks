import { useState, useEffect, useRef } from 'react';

export function useStateCB(initialState) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(initialState);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (setState.callback) {
      setState.callback(state);
      setState.callback = null;
    }
  }, [state]);

  useEffect(() => {
    mountedRef.current = true;
    return function() {
      mountedRef.current = false;
    };
  }, []);

  function newSetState(newState, callback) {
    if (!mountedRef.current) {
      // To safely set state
      console.warn(
        'The react component has been unmounted, and the set state action has been automatically ignored',
      );
      return;
    }
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
