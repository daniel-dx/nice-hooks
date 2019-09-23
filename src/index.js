import { useState, useEffect } from 'react';

const useStateCB = initialState => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (setState.callback) setState.callback(state);
  }, [state]);

  function newSetState(newState, callback) {
    if (callback) setState.callback = callback;
    setState(newState);
  }

  return [state, newSetState];
};

export default useStateCB;
