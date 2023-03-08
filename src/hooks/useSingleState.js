import { useRef } from 'react';
import { useStateCB } from './useStateCB';

export function useSingleState(initialStateObj) {
  const [getState, setState] = useStateCB(initialStateObj);
  const stateObj = useRef({ ...initialStateObj }).current;

  if (!stateObj._definedProperty) {
    Object.keys(stateObj).forEach(key => {
      if (key) {
        Object.defineProperty(stateObj, key, {
          get() {
            return getState()[key];
          },
        });
      }
    });
    stateObj._definedProperty = true;
  }

  function newSetState(partialStates, callback) {
    setState({ ...getState(), ...partialStates }, callback);
  }

  return [stateObj, newSetState];
}

export default useSingleState;
