# Nice Hooks

[中文版](README_CN.md)

A lot of nice hooks to make react hooks easier to use.

> If you find this project is useful to you, please give me a star.

## Installation

`npm install nice-hooks`

## Hooks

- [useStateCB](#useStateCB)

Lets you safely use the state of the react , whose value is the value you want, not the stale value. And also has the ability to callback.

- [useSingleState (recommended)] (#useSingleState)

Use `state` with a way like `this.state` and `this.setState` in the form of `class`. It is also safe to use state and have callback capabilities

- [useLifeCycle](#useLifeCycle)

Support lifecycle declarations to make code organization more readable, rather than using a bunch of useEffect.

- [useInstanceVar](#useInstanceVar)

Support for instance variables. That is, after each re-render, the latest value of the variable can be obtained.

- [useSingleInstanceVar (recommended)] (#useSingleInstanceVar)

(Recommended) Declare all instance variables together and use them closer to the instance variables

## Usage

### useStateCB

Lets you safely use the state of the react , whose value is the value you want, not the stale value. And also has the ability to callback.

```
# Example

Import React from 'react';

Import { useStateCB } from 'nice-hooks';

Export const UseStateCBDemoComp = () => {
  Const [getCount, setCount] = useStateCB(0);

  Function doSomeActions() {
    Console.log('Current count:', getCount());
  }

  Return (
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

Import React from "react";

Import { useSingleState } from "nice-hooks";

Export const UseSingleStateDemoComp = () => {
  Const [state, setState] = useSingleState({
    Count: 0,
    Time: +new Date()
  });

  Function doSomeActions() {
    Console.log("Current count:", state.count);
  }

  Return (
    <div>
      <h2>useSingleState</h2>

      <p>{state.count} {state.time}</p>

      <button
        Type="button"
        onClick={() =>
          setState(
            {
              Count: state.count + 1
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
            Time: +new Date()
          })
        }
      >
        Chnange Time
      </button>
    </div>
  );
};
```

### useLifeCycle

Support lifecycle declarations to make code organization more readable, rather than using a bunch of useEffect.

```
# Example

Import React from 'react';

Import { useLifeCycle } from 'nice-hooks';

Const App = () => {
  
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

  Return (
    <div></div>
  );
};
```

### useInstanceVar

Support for instance variables. That is, after each re-render, the latest value of the variable can be obtained.

```
# Example

Import React from "react";

Import { useInstanceVar, useSingleState } from "nice-hooks";

Export const UseInstanceVarDemoComp = () => {
  Const [getIntervalVal, setIntervalVal] = useInstanceVar(null);

  Const [state, setState] = useSingleState({ count: 0 });

  Function start() {
    Const interval = setInterval(
      () => setState({ count: state.count + 1 }),
      1000
    );
    setIntervalVal(interval);
  }

  Function stop() {
    Const interval = getIntervalVal();
    Interval && clearInterval(interval);
  }

  Return (
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

Import React from "react";

Import { useSingleInstanceVar, useSingleState } from "nice-hooks";

Export const UseSingleInstanceVarDemoComp = () => {
  Const instanceVal = useSingleInstanceVar({
    Interval: null
  });

  Const [state, setState] = useSingleState({ count: 0 });

  Function start() {
    instanceVal.interval = setInterval(
      () => setState({ count: state.count + 1 }),
      1000
    );
  }

  Function stop() {
    Const interval = instanceVal.interval;
    Interval && clearInterval(interval);
  }

  Return (
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
