import { useState, useEffect, useRef } from 'react';

export function useStateCB(initialState) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (setState.callback) setState.callback(state);
  }, [state]);

  function newSetState(newState, callback) {
    if (callback) setState.callback = callback;
    setState(newState);
  }

  return [state, newSetState];
}

export function useLifeCycle({
  didMount,
  willUnmount,
  didUpdate,
  didMountAndWillUnmount = [],
} = {}) {
  const initRef = useRef(true);

  useEffect(() => {
    if (didMount) didMount.call();
    didMountAndWillUnmount.forEach(
      item => item.didMount && item.didMount.call(),
    );

    return () => {
      if (willUnmount) willUnmount.call();
      didMountAndWillUnmount.forEach(
        item => item.willUnmount && item.willUnmount.call(),
      );
    };
  }, []);

  useEffect(() => {
    if (initRef.current) initRef.current = false;
    else if (didUpdate && !initRef.current) didUpdate.call();
  });
}

export function useInstanceVar(initialValue) {
  const instRef = useRef(initialValue);

  function setVal(val) {
    instRef.current = val;
  }

  return [instRef.current, setVal];
}
