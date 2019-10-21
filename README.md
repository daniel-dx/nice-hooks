# Nice Hooks

[中文版](README_CN.md)

A lot of nice hooks to make react hooks easier to use.

> If you find this project is useful to you, please give me a star.

## Installation

`npm install nice-hooks`

## Hooks

- [useStateCB](#useStateCB)

Lets you safely use the state of the react , whose value is the value you want, not the stale value. And also has the ability to callback.

- [useSingleState (recommended)](#useSingleState)

Use `state` with a way like `this.state` and `this.setState` in the form of `class`. It is also safe to use state and have callback capabilities

- [useLifeCycle](#useLifeCycle)

Support lifecycle declarations to make code organization more readable, rather than using a bunch of useEffect.

- [useInstanceVar](#useInstanceVar)

Support for instance variables. That is, after each re-render, the latest value of the variable can be obtained.

- [useSingleInstanceVar (recommended)](#useSingleInstanceVar)

(Recommended) Declare all instance variables together and use them closer to the instance variables

## Usage

### useStateCB

Lets you safely use the state of the react , whose value is the value you want, not the stale value. And also has the ability to callback.

```
# Example

import React from 'react';

import { useStateCB } from 'nice-hooks';

export const UseStateCBDemoComp = () => {
  const [getCount, setCount] = useStateCB(0);

  function doSomeActions() {
    console.log('Current count:', getCount());
  }

  return (
    <div>
      <p>{getCount()}</p>

      <button type="button" onClick={() => setCount(getCount() + 1, doSomeActions)}>
        Increase
      </button>
    </div>
  );
};
```

### useSingleState

(Recommended) Use `state` with a way like `this.state` and `this.setState` in the form of `class`. It is also safe to use state and have callback capabilities

```
# Example

import React from "react";

import { useSingleState } from "nice-hooks";

export const UseSingleStateDemoComp = () => {
  const [state, setState] = useSingleState({
    count: 0,
    time: +new Date()
  });

  function doSomeActions() {
    console.log("Current count:", state.count);
  }

  return (
    <div>
      <h2>useSingleState</h2>

      <p>{state.count} {state.time}</p>

      <button
        type="button"
        onClick={() =>
          setState(
            {
              count: state.count + 1
            },
            doSomeActions
          )
        }
      >
        Increase
      </button>
      <button type="button"
        onClick={() =>
          setState({
            time: +new Date()
          })
        }
      >
        Chnange Time
      </button>
    </div>
  );
};# Example

import React from 'react';

import { useLifeCycle } from 'nice-hooks';

const App = () => {
  
  useLifeCycle({

    didMount() {
      // Do something after mounted
    },

    willUnmount() {
      // Do something when the component will be unmount
    },

    didUpdate() {
      // Do something after re-rendered.
    },

    didMountAndWillUnmount: [
      {
        didMount() {
          // Example: setTimeout
        },
        willUnmount() {
          // Example: clearTimeout
        }
      },
      {
        didMount() {
          // Example: on resize event
          // ...
        },
        willUnmount() {
          // Example: off resize event 
          // ...
        }
      }
    ]
  })

  return (
    <div></div>
  );
};
```

### useInstanceVar

Support for instance variables. That is, after each re-render, the latest value of the variable can be obtained.

```
# Example

import React from "react";

import { useInstanceVar, useSingleState } from "nice-hooks";

export const UseInstanceVarDemoComp = () => {
  const [getIntervalVal, setIntervalVal] = useInstanceVar(null);

  const [state, setState] = useSingleState({ count: 0 });

  function start() {
    const interval = setInterval(
      () => setState({ count: state.count + 1 }),
      1000
    );
    setIntervalVal(interval);
  }

  function stop() {
    const interval = getIntervalVal();
    interval && clearInterval(interval);
  }

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
```

### useSingleInstanceVar

(Recommended) Declare all instance variables together and use them closer to the instance variables

```
# Example

import React from "react";

import { useSingleInstanceVar, useSingleState } from "nice-hooks";

export const UseSingleInstanceVarDemoComp = () => {
  const instanceVal = useSingleInstanceVar({
    interval: null
  });

  const [state, setState] = useSingleState({ count: 0 });

  function start() {
    instanceVal.interval = setInterval(
      () => setState({ count: state.count + 1 }),
      1000
    );
  }

  function stop() {
    const interval = instanceVal.interval;
    interval && clearInterval(interval);
  }

  return (
    <div>
      <p>{state.count}</p>
      <button type="button" onClick={start}>Start</button>
      <button type="button" onClick={stop}>Stop</button>
    </div>
  );
};
```

## Contribute

* `git clone https://github.com/daniel-dx/nice-hooks.git`
* `cd nice-hooks`
* `npm install`
* `npm run test`
