import { useState, useEffect, useRef } from 'react';

export function useStateCB(initialState) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(initialState);

  useEffect(() => {
    if (setState.callback) setState.callback(state);
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

export function useSingleState(initialStateObj) {
  const [getState, setState] = useStateCB(initialStateObj);
  const initialStateObjRef = useRef(Object.assign({}, initialStateObj));
  let stateObj = initialStateObjRef.current;

  useEffect(function() {
    Object.keys(stateObj).forEach(key => {
      if (key) {
        Object.defineProperty(stateObj, key, {
          get() {
            return getState()[key];
          }
        });
      }
    });
  }, []);

  function newSetState(partialStates, callback) {
    setState(Object.assign({}, getState(), partialStates), callback);
  }

  return [stateObj, newSetState];
}

export function useLifeCycle({
  didMount,
  willUnmount,
  didUpdate,
  didMountAndWillUnmount = [],
} = {}) {
  const initRef = useRef(true);

  const didMountFn = useRef(didMount);
  const willUnmountFn = useRef(willUnmount);
  const didMountAndWillUnmountConfig = useRef(didMountAndWillUnmount);

  useEffect(() => {
    if (didMountFn.current) didMountFn.current.call();
    didMountAndWillUnmountConfig.current.forEach(
      item => item.didMount && item.didMount.call(),
    );

    return () => {
      if (willUnmountFn.current) willUnmountFn.current.call();
      didMountAndWillUnmountConfig.current.forEach(
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

  function getVal() {
    return instRef.current;
  }

  function setVal(val) {
    instRef.current = val;
  }

  return [getVal, setVal];
}

export function useSingleInstanceVar(initialValue) {
  const instRef = useRef(initialValue);
  const returnVal = useRef(Object.assign({}, initialValue)).current;

  useEffect(function() {
    Object.keys(returnVal).forEach(key => {
      if (key) {
        Object.defineProperty(returnVal, key, {
          get() {
            return instRef.current[key];
          },
          set(val) {
            instRef.current = Object.assign({}, instRef.current, {
              [key]: val
            });
          }
        });
      }
    });
  }, []);

  return returnVal;
}

