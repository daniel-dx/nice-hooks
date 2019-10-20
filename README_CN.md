# Nice Hooks

[English](README.md)

一些 Nice 的 Hooks，使得 React Hooks 更易于使用。

> 如果你发现该项目对你有用，请加个星吧。

## 安装

`npm install nice-hooks`

## Hooks

- [useStateCB](#useStateCB)

让你可以安全地使用 react 的 state，它的值就是你想要的值，而不是陈旧的值。并且也拥有了 callback 的能力。

- [useSingleState（推荐使用）](#useSingleState)

使用类似于 `class` 形式的 `this.state` 和 `this.setState` 的方式来使用 `state`。同样可以安全地使用 state，并且拥有 callback 能力

- [useLifeCycle](#useLifeCycle)

支持生命周期声明，以使代码组织更具可读性，而不是使用一堆 useEffect。

- [useInstanceVar](#useInstanceVar)

支持实例变量。即在每次重新渲染后，可获取该变量最新的值。

- [useSingleInstanceVar（推荐使用）](#useSingleInstanceVar)

（推荐使用）将所有实例变量声明在一起，并以更接近实例变量的方式使用

## 使用

### useStateCB

让你可以安全地使用 react 的 state，它的值就是你想要的值，而不是陈旧的值。并且也拥有了 callback 的能力。

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

（推荐使用）使用类似于 `class` 形式的 `this.state` 和 `this.setState` 的方式来使用 `state`。同样可以安全地使用 state，并且拥有 callback 能力

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
};
```

### useLifeCycle

支持生命周期声明，以使代码组织更具可读性，而不是使用一堆 useEffect。

```
# Example

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

支持实例变量。即在每次重新渲染后，可获取该变量最新的值。

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

（推荐使用）将所有实例变量声明在一起，并以更接近实例变量的方式使用

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

## 贡献

* `git clone https://github.com/daniel-dx/nice-hooks.git`
* `cd nice-hooks`
* `npm install`
* `npm run test`
