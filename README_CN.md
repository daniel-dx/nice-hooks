# Nice Hooks

[English](README.md)

一些 Nice 的 Hooks，使得 React Hooks 更易于使用。

> 如果你发现该项目对你有用，请加个星吧。

## 安装

`npm install nice-hooks`

## Hooks

- [useStateCB](#useStateCB)

让 react useState hook 拥有 callback 能力。

- [useLifeCycle](#useLifeCycle)

支持生命周期声明，以使代码组织更具可读性，而不是使用一堆 useEffect。

- [useInstanceVar](#useInstanceVar)

支持实例变量。即在每次重新渲染后，可获取该变量最新的值。

## 使用

### useStateCB

让 react useState hook 拥有 callback 能力。

```
import React from 'react';

import { useStateCB } from 'nice-hooks';

const App = () => {
  const [count, setCount] = useStateCB(0);

  // Note: must use count state with method arguments instead of directly using the value of count state defined above
  function doSomeActions(count) {
    document.title = `Count: ${count}`
  }

  return (
    <div>
      {count}

      <button type="button" onClick={() => setCount(count + 1, doSomeActions)}>
        Increase
      </button>
    </div>
  );
};
```

### useLifeCycle

支持生命周期声明，以使代码组织更具可读性，而不是使用一堆 useEffect。

```
import React from 'react';

import { useLifeCycle } from 'nice-hooks';

const App = () => {
  
  useLifeCycle({

    didMount() {
      // Do something after mounted
    },

    willUnmount() {
      // Do something when the component is about to be unmount
    },

    didUpdate() {
      // Do something after re-rendered.
    },

    didMountAndWillUnmount: [
      {
        didMount() {
          // Example a: setTimeout
          // Example b: on event
          // ...
        },
        willUnmount() {
          // Example a: clearTimeout
          // Example b: off event 
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

import React, { useState } from 'react';

import { useInstanceVar } from 'nice-hooks';

const App = () => {

  const [intervalVal, setIntervalVal] = useInstanceVar(null);

  const [count, setCount] = useState(0);

  function start() {
    const interval = setInterval(() => setCount(oldVal => oldVal + 1), 1000);
    setIntervalVal(interval);
  }

  function stop() {
    clearInterval(intervalVal);
    setIntervalVal(null);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

```

## 贡献

* `git clone https://github.com/daniel-dx/nice-hooks.git`
* `cd nice-hooks`
* `npm install`
* `npm run test`
